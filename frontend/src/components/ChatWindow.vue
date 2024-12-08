<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="messages" ref="messageContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.isSender ? 'sent' : 'received']"
        >
          <div class="message-content">{{ message.text }}</div>
        </div>
      </div>

      <form @submit.prevent="sendMessage" class="message-form">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type a message..."
          class="message-input"
        />
        <button type="submit" class="send-button">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, watchEffect } from "vue";
import MessageService from "../services/MessageService";
import EncryptionService from "../services/EncryptionService";
import { importKeyFromHex } from "../utils/Encryption";

export default {
  props: {
    selectedUser: Object,
  },
  setup(props) {
    const messages = ref([]);
    const newMessage = ref("");
    const messageContainer = ref(null);

    // Fetch messages for the selected user
    const fetchMessages = async () => {
      const userId = props.selectedUser.id; // Use the selected user's ID
      const response = await MessageService.getMessages(userId);
      console.log(response);

      const decryptedMessages = await Promise.all(
        response.map(async (message) => {
          return { ...message, text: message.content };
        })
      );

      messages.value = decryptedMessages;
    };

    const sendMessage = async () => {
      if (newMessage.value.trim()) {
        const userId = props.selectedUser.id; // Use the selected user's ID
        await MessageService.sendMessage(userId, newMessage.value);
        newMessage.value = "";
        await fetchMessages();
      }
    };

    const scrollToBottom = () => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    };

    onMounted(() => {
      fetchMessages();
      scrollToBottom();
    });

    watch(props.selectedUser, () => {
      fetchMessages(); // Fetch messages when selectedUser changes
      scrollToBottom();
    });

    return {
      messages,
      newMessage,
      sendMessage,
      messageContainer,
    };
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.chat-window {
  background-color: #212121;
  border-radius: 8px;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  max-width: 80%;
  word-wrap: break-word;
}

.sent {
  background-color: #4caf50;
  align-self: flex-end;
  text-align: right;
}

.received {
  background-color: #2196f3;
  align-self: flex-start;
  text-align: left;
}

.message-content {
  color: #fff;
  font-size: 14px;
}

.message-form {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #333;
}

.message-input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #444;
  color: #fff;
}

.send-button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #45a049;
}
</style>
