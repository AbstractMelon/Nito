<template>
  <div class="register-container">
    <form @submit.prevent="handleRegister">
      <div class="input-group">
        <input v-model="username" type="text" placeholder="Username" required />
      </div>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <div class="input-group">
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />
      </div>
      <div class="input-group">
        <button type="submit">Register</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "../services/AuthService";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const error = ref(null);
    const router = useRouter();

    const handleRegister = async () => {
      if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match";
        return;
      }

      try {
        // Call register and receive the token in the response
        const response = await AuthService.register(
          username.value,
          password.value
        );

        // Store the JWT token in local storage
        localStorage.setItem("token", response.token);

        // Redirect the user to the dashboard
        router.push("/dashboard");
      } catch (err) {
        error.value = err.message || "Registration failed";
      }
    };

    return {
      username,
      password,
      confirmPassword,
      error,
      handleRegister,
    };
  },
};
</script>

<style scoped>
.register-container form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group input,
.input-group button {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #242424;
  color: #e0e0e0;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%;
}

.input-group input:focus,
.input-group button:focus {
  outline: none;
  background-color: #333;
}

.input-group button {
  background-color: #ff6f61;
  border: 1px solid #ff6f61;
  cursor: pointer;
}

.input-group button:hover {
  background-color: #e65c54;
}

.error {
  color: #ff6f61;
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>
