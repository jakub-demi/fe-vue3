import DashboardView from "@/views/dashboard/DashboardView.vue"
import type { RouteRecordRaw } from "vue-router"

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardView,
  },
]
export default dashboardRoutes
