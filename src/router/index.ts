import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import LoginView from "@/views/login/LoginView.vue"
import dashboardRoutes from "@/router/dashboardRoutes"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
        reqAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
        reqAuth: false,
      },
    },
    {
      path: "/dashboard",
      name: "",
      component: () => import("@/layouts/DashboardLayout.vue"),
      meta: {
        reqAuth: true,
      },
      children: dashboardRoutes,
    },
  ],
})

router.beforeEach((to, from) => {
  to.meta.title &&
    (document.title =
      (to.meta.title as string) + " | " + (import.meta.env.VITE_PUBLIC_APP_NAME ?? "App"))
})

export default router
