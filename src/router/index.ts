import { createRouter, createWebHistory } from "vue-router"
import LoginView from "@/views/login/LoginView.vue"
import dashboardRoutes from "@/router/dashboardRoutes"
import authStore from "@/stores/authStore"
import pageLoaderStore from "@/stores/pageLoaderStore"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: {
        name: "login",
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
        title: "Dashboard",
      },
      children: dashboardRoutes,
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/_documentErrors/ErrorDocument404.vue"),
      meta: {
        title: "404",
      },
    },
    {
      path: "/:pathMatch(.*)",
      redirect: {
        name: "404",
      },
    },
  ],
})

export const go = (route: string) => {
  router.push({ name: route })
}

router.beforeEach(async (to, from) => {
  pageLoaderStore().setLoading(true)

  to.meta.title &&
    (document.title =
      (to.meta.title as string) + " | " + (import.meta.env.VITE_PUBLIC_APP_NAME ?? "App"))

  const auth = authStore()
  const user = await auth.checkLoginState()

  if (!user && to.fullPath.includes("dashboard")) {
    return { name: "login" }
  }

  if (user && to.name === "login") {
    return { name: "dashboard" }
  }
})

router.afterEach((to) => {
  pageLoaderStore().setLoading(false)
})

export default router
