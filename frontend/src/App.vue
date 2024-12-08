<template>
  <div id="app">
    <nav v-if="isAuthenticated">
      <div class="nav-container">
        <div class="nav-links">
          <router-link to="/" active-class="active-link">Nito</router-link>
          <router-link to="/dashboard" active-class="active-link"
            >Dashboard</router-link
          >
        </div>
        <div class="nav-actions">
          <button @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <nav v-if="!isAuthenticated">
      <div class="nav-container">
        <div class="nav-links">
          <router-link to="/" active-class="active-link">Nito</router-link>
        </div>
        <div class="nav-actions">
          <button @click="$router.push('/auth')">Login/Signup</button>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import AuthService from "./services/AuthService";

export default {
  setup() {
    const router = useRouter();

    const isAuthenticated = computed(() => {
      return !!localStorage.getItem("token");
    });

    const logout = () => {
      AuthService.logout();
      router.push("/auth");
    };

    return {
      isAuthenticated,
      logout,
    };
  },
};
</script>

<style lang="css" scoped>
#app {
  font-family: "Arial", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #121212;
}

nav {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
}

.nav-links a {
  margin-right: 20px;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #f39c12;
}

.nav-links a.active {
  color: #bc790d;
}

.nav-actions button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nav-actions button:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
  }

  router-link {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .nav-actions button {
    margin-top: 10px;
  }
}
</style>
