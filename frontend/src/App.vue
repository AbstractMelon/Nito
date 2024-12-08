<template>
  <div id="app">
    <!-- Desktop Navigation (visible only on large screens) -->
    <nav v-if="isAuthenticated">
      <div class="nav-container">
        <div class="nav-links">
          <router-link to="/" active-class="active-link">Nito</router-link>
          <router-link to="/chat" active-class="active-link">Chat</router-link>
          <router-link to="/profile" active-class="active-link"
            >Profile</router-link
          >
        </div>
        <div class="nav-actions">
          <button @click="logout">Settings</button>
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

    <!-- Mobile Hamburger Menu -->
    <div class="mobile-nav">
      <button @click="toggleMobileMenu" class="hamburger-btn">&#9776;</button>
      <div v-if="showMobileMenu" class="mobile-menu">
        <router-link to="/" @click="closeMobileMenu" active-class="active-link"
          >Nito</router-link
        >
        <router-link
          to="/chat"
          @click="closeMobileMenu"
          active-class="active-link"
          >Chat</router-link
        >
        <router-link
          to="/auth"
          @click="closeMobileMenu"
          active-class="active-link"
          >Login/Signup</router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import AuthService from "./services/AuthService";

export default {
  setup() {
    const router = useRouter();
    const isAuthenticated = computed(() => !!localStorage.getItem("token"));
    const showMobileMenu = ref(false); // For mobile menu toggle

    const logout = () => {
      AuthService.logout();
      router.push("/auth");
    };

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    };

    const closeMobileMenu = () => {
      showMobileMenu.value = false;
    };

    return {
      isAuthenticated,
      logout,
      showMobileMenu,
      toggleMobileMenu,
      closeMobileMenu,
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
  margin: 0 5px;
}

.nav-actions button:hover {
  background-color: #c0392b;
}

/* Mobile Nav Styles */
.mobile-nav {
  display: none;
}

.hamburger-btn {
  display: none;
  font-size: 30px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--background-gray);
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  top: 50px;
  right: 20px;
  width: 200px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.mobile-menu a {
  margin: 10px 0;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
}

.mobile-menu a:hover {
  color: #f39c12;
}

.mobile-menu a.active {
  color: #bc790d;
}

/* Hide desktop navigation on mobile */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Hide the desktop nav on mobile */
  }

  .nav-actions button {
    margin-top: 10px;
  }

  .hamburger-btn {
    display: block; /* Show the hamburger menu */
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .mobile-nav {
    display: block; /* Show mobile nav */
  }
}
</style>
