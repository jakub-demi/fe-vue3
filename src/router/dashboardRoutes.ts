import type { RouteRecordRaw } from "vue-router"
import DashboardView from "@/views/dashboard/DashboardView.vue"
import ProfileView from "@/views/dashboard/profile/ProfileView.vue"

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "dashboard",
    component: DashboardView,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "profile",
    name: "profile",
    component: ProfileView,
    meta: {
      title: "User Profile",
    },
  },
  {
    path: "test",
    name: "test",
    component: () => import("@/views/_t/TheTest.vue"),
    meta: {
      title: "Test",
    },
  },
]
export default dashboardRoutes
