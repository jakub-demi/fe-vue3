import DashboardView from "@/views/dashboard/DashboardView.vue"
import type { RouteRecordRaw } from "vue-router"

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
    path: "test",
    name: "test",
    component: () => import("@/views/_t/TheTest.vue"),
    meta: {
      title: "Test",
    },
  },
]
export default dashboardRoutes
