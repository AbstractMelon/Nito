<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
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
    const error = ref(null);
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await AuthService.login(username.value, password.value);
        router.push("/dashboard");
      } catch (err) {
        error.value = err.message || "Login failed";
      }
    };

    return {
      username,
      password,
      error,
      handleLogin,
    };
  },
};
</script>
