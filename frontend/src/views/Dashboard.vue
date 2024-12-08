<template>
  <div class="dashboard">
    <div class="user-list">
      <h2>Users</h2>
      <div
        v-for="user in users"
        :key="user.id"
        @click="selectUser(user)"
        :class="{ selected: selectedUser && selectedUser.id === user.id }"
      >
        {{ user.username }}
      </div>
    </div>

    <div class="chat-area" v-if="selectedUser">
      <ChatWindow :selectedUser="selectedUser" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import AuthService from "../services/AuthService";
import ChatWindow from "../components/ChatWindow.vue";

export default {
  components: { ChatWindow },
  setup() {
    const users = ref([]);
    const selectedUser = ref(null);

    const loadUsers = async () => {
      try {
        users.value = await AuthService.getUsers();
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };

    const selectUser = (user) => {
      selectedUser.value = user;
    };

    onMounted(loadUsers);

    return {
      users,
      selectedUser,
      selectUser,
    };
  },
};
</script>

<style scoped>
.dashboard {
  margin-top: 5px;
  display: flex;
  padding: 10px;
  background-color: var(--background-dark);
  color: var(--text-light);
}

.user-list {
  flex: 1;
  background-color: var(--background-light);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 40vh;
  height: 90vh;
}

.user-list h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: var(--primary-color);
}

.user-list div {
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.user-list div:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.selected {
  background-color: var(--primary-color);
  color: #fff;
}

.chat-area {
  flex: 2;
  margin-left: 20px;
  background-color: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
