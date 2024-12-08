const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const EncryptionUtil = require("../utils/encryption");

class MessageController {
  // Utility to get the file path for a conversation
  static getChatFilePath(user1, user2) {
    const chatDir = path.join(__dirname, "../../database/chats");
    const [id1, id2] = [user1, user2].sort();
    return path.join(chatDir, `chat-${id1}-${id2}.json`);
  }

  static async sendMessage(user1, user2, content) {
    const chatPath = this.getChatFilePath(user1, user2);

    try {
      // Load existing messages or initialize
      let messages = [];
      if (await fs.stat(chatPath).catch(() => false)) {
        messages = JSON.parse(await fs.readFile(chatPath, "utf8"));
      }

      const encryptedContent = EncryptionUtil.encrypt(content);

      const newMessage = {
        id: uuidv4(),
        senderId: user1,
        receiverId: user2,
        content: encryptedContent,
        timestamp: new Date().toISOString(),
      };

      messages.push(newMessage);
      await fs.writeFile(chatPath, JSON.stringify(messages, null, 2), "utf8");

      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  static async getMessages(user1, user2) {
    const chatPath = this.getChatFilePath(user1, user2);

    try {
      if (!(await fs.stat(chatPath).catch(() => false))) {
        return []; // No messages if file doesn't exist
      }

      const messages = JSON.parse(await fs.readFile(chatPath, "utf8"));

      return messages.map((msg) => ({
        ...msg,
        content: msg.content.content
          ? EncryptionUtil.decrypt(
              msg.content.content,
              msg.content.key,
              msg.content.iv
            )
          : msg.content,
      }));
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MessageController;
