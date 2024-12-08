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
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import MessageService from "../services/MessageService";

export default {
  props: {
    selectedUser: Object,
  },
  setup(props) {
    const messages = ref([]);
    const newMessage = ref("");
    const messageContainer = ref(null);
    let messageInterval = null;

    const formatTimestamp = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const fetchMessages = async () => {
      if (props.selectedUser && props.selectedUser.id) {
        const userId = props.selectedUser.id;
        const response = await MessageService.getMessages(userId);

        const decryptedMessages = await Promise.all(
          response.map(async (message) => {
            const isSender = message.senderId === userId;
            const senderName = isSender ? "You" : props.selectedUser.username;
            return {
              ...message,
              text: message.content,
              senderName,
              timestamp: message.timestamp,
              isSender,
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
        scrollToBottom();
      }
    };

    const scrollToBottom = () => {
      if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
      }
    };

    watchEffect(() => {
      if (props.selectedUser) {
        fetchMessages();
      }
    });

    onMounted(() => {
      if (props.selectedUser) {
        fetchMessages();
        messageInterval = setInterval(fetchMessages, 1000);
      }
    });

    onUnmounted(() => {
      if (messageInterval) {
        clearInterval(messageInterval);
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
  background-color: var(--background-gray);
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
  background-color: var(--message-sent);
  align-self: flex-end;
  color: #fff;
}

.received {
  background-color: var(--message-received);
  align-self: flex-start;
  color: #fff;
  text-align: left;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--gray-light);
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
  background-color: var(--background-dark);
}

.message-input {
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: var(--background-light);
  color: var(--text-light);
}

.send-button {
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-button:hover {
  background-color: var(--secondary-color);
}
</style>
