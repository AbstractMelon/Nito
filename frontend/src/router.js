import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Chat from "./views/Chat.vue";
import Auth from "./views/Auth.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: "/chat",
    component: Chat,
    meta: { requiresAuth: true },
  },
  {
    path: "/auth",
    component: Auth,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth");
  } else if (to.path === "/auth" && isAuthenticated) {
    next("/chat");
  } else {
    next();
  }
});

export default router;
