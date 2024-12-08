<template>
  <div class="chat-container">
    <div class="chat-window">
      <div class="messages" ref="messageContainer">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', message.isSender ? 'received' : 'sent']"
        >
          <div class="message-header">
            <span class="sender-name">{{ message.senderName }}</span>
            <span class="message-time">{{
              formatTimestamp(message.timestamp)
            }}</span>
          </div>
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
import { ref, onMounted, watchEffect } from "vue";
import MessageService from "../services/MessageService";

export default {
  props: {
    selectedUser: Object,
  },
  setup(props) {
    const messages = ref([]);
    const newMessage = ref("");
    const messageContainer = ref(null);

    // Manually format the timestamp into a more readable format (e.g., 12:33 AM)
    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert hours from 24-hour format to 12-hour format
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    // Fetch messages for the selected user
    const fetchMessages = async () => {
      if (props.selectedUser && props.selectedUser.id) {
        const userId = props.selectedUser.id;
        const response = await MessageService.getMessages(userId);

        const decryptedMessages = await Promise.all(
          response.map(async (message) => {
            const isSender = message.senderId === userId; // Check if the current user is the sender
            const senderName = isSender ? "Other User" : "You";
            return {
              ...message,
              text: message.content,
              senderName, // Add sender name
              timestamp: message.timestamp,
              isSender, // Mark message as sent or received
            };
          })
        );

        messages.value = decryptedMessages;
        scrollToBottom();
      }
    };

    const sendMessage = async () => {
      if (newMessage.value.trim()) {
        const userId = props.selectedUser.id;
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

    // Automatically fetch messages whenever selectedUser changes
    watchEffect(() => {
      if (props.selectedUser) {
        fetchMessages();
      }
    });

    onMounted(() => {
      if (props.selectedUser) {
        fetchMessages();
      }
    });

    return {
      messages,
      newMessage,
      sendMessage,
      messageContainer,
      formatTimestamp,
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
  background-color: #2f3136; /* Discord dark background */
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
  margin: 8px 0;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  word-wrap: break-word;
}

.sent {
  background-color: #2957fc76;
  align-self: flex-end;
}

.received {
  background-color: #00ff9d76; /* Discord blue */
  align-self: flex-start;
  text-align: left;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #b9bbbe;
}

.sender-name {
  font-weight: bold;
}

.message-time {
  color: #ffffff;
}

.message-content {
  color: #fff;
  font-size: 14px;
  word-wrap: break-word;
}

.message-form {
  display: flex;
  padding: 10px;
  border-top: 1px solid #444;
  background-color: #2f3136;
}

.message-input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #3e444e;
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
