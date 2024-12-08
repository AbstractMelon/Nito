import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard.vue";
import Auth from "./views/Auth.vue";

const routes = [
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    component: Dashboard,
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
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
