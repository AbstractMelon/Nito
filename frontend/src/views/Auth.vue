<template>
  <div class="auth-container">
    <div class="auth-toggle">
      <button
        @click="currentView = 'login'"
        :class="{ active: currentView === 'login' }"
      >
        Login
      </button>
      <button
        @click="currentView = 'register'"
        :class="{ active: currentView === 'register' }"
      >
        Register
      </button>
    </div>

    <div class="form-container">
      <Login v-if="currentView === 'login'" />
      <Register v-else-if="currentView === 'register'" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default {
  components: { Login, Register },
  setup() {
    const currentView = ref("login");
    return { currentView };
  },
};
</script>

<style scoped>
.auth-container {
  justify-content: center;
  align-items: center;
  height: fit-content;
  background-color: #121212;
  color: #e0e0e0;
  margin: auto;
  margin-top: 25vh;
}

.auth-toggle {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.auth-toggle button {
  background-color: #242424;
  border: 1px solid #ddd;
  padding: 12px 25px;
  font-size: 1.1rem;
  margin-right: 10px;
  border-radius: 5px;
  color: #e0e0e0;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.auth-toggle button.active {
  background-color: #ff6f61;
  color: #fff;
  transform: scale(1.05);
}

.auth-toggle button:hover {
  background-color: #e65c54;
}

.form-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.auth-container {
  background-color: #1d1d1d;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: fit-content;
}
</style>
