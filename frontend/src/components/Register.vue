<template>
  <div class="register-container">
    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Register</button>
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
        await AuthService.register(username.value, password.value);
        router.push("/auth");
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
