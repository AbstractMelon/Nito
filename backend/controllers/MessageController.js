const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const EncryptionUtil = require("../utils/encryption");

class MessageController {
  static async sendMessage(senderId, receiverId, content) {
    const messagesPath = path.join(__dirname, "../../database/messages.json");

    try {
      const messages = JSON.parse(await fs.readFile(messagesPath, "utf8"));

      const encryptedContent = EncryptionUtil.encrypt(content);

      const newMessage = {
        id: uuidv4(),
        senderId,
        receiverId,
        content: encryptedContent,
        timestamp: new Date().toISOString(),
      };

      messages.push(newMessage);
      await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));

      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  static async getMessages(userId, otherUserId) {
    const messagesPath = path.join(__dirname, "../../database/messages.json");

    try {
      const messages = JSON.parse(await fs.readFile(messagesPath, "utf8"));

      const userMessages = messages
        .filter(
          (msg) =>
            (msg.senderId === userId && msg.receiverId === otherUserId) ||
            (msg.senderId === otherUserId && msg.receiverId === userId)
        )
        .map((msg) => ({
          ...msg,
          content: msg.content.content
            ? EncryptionUtil.decrypt(
                msg.content.content,
                msg.content.key,
                msg.content.iv
              )
            : msg.content,
        }));

      return userMessages;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MessageController;
