<template>
  <div class="chat">
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

      <!-- Add User Button at the bottom of the list -->
      <button class="add-user-btn" @click="showAddUserModal = true">
        Add User
      </button>
    </div>

    <div class="chat-area" v-if="selectedUser">
      <ChatWindow :selectedUser="selectedUser" />
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="modal">
      <div class="modal-content">
        <h3>Add User</h3>
        <input type="text" v-model="newUserId" placeholder="Enter user ID" />
        <button @click="addUser">Add</button>
        <button @click="showAddUserModal = false">Cancel</button>
      </div>
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
    const showAddUserModal = ref(false); // Controls modal visibility
    const newUserId = ref(""); // New user ID input value

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

    const addUser = async () => {
      if (newUserId.value.trim()) {
        try {
          await AuthService.addUser(newUserId.value); // Add user service call
          users.value.push({ id: newUserId.value, username: newUserId.value });
          newUserId.value = ""; // Clear input after adding
          showAddUserModal.value = false; // Close modal
        } catch (error) {
          console.error("Failed to add user", error);
        }
      }
    };

    onMounted(loadUsers);

    return {
      users,
      selectedUser,
      selectUser,
      showAddUserModal,
      newUserId,
      addUser,
    };
  },
};
</script>

<style scoped>
.chat {
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
  display: flex;
  flex-direction: column;
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

.add-user-btn {
  margin-top: auto; /* Pushes the button to the bottom */
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-user-btn:hover {
  background-color: var(--primary-color-dark);
}

.chat-area {
  flex: 2;
  margin-left: 20px;
  background-color: var(--background-light);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: var(--background-gray);
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.modal-content button {
  padding: 8px 15px;
  margin: 5px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: var(--primary-color-dark);
}
</style>
