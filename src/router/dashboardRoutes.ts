import type { RouteRecordRaw } from "vue-router"
import DashboardView from "@/views/dashboard/DashboardView.vue"
import ProfileView from "@/views/dashboard/profile/ProfileView.vue"
import OrdersIndex from "@/views/dashboard/orders/OrdersIndex.vue"
import OrdersCreate from "@/views/dashboard/orders/OrdersCreate.vue"

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
  //! Orders Routes
  {
    path: "orders",
    name: "orders",
    component: OrdersIndex,
    meta: {
      title: "Orders",
    },
  },
  {
    path: "orders/create",
    name: "orders.create",
    component: OrdersCreate,
    meta: {
      title: "Order - Create",
    },
  },
  // {
  //   path: "test",
  //   name: "test",
  //   component: () => import("@/views/_t/TheTest.vue"),
  //   meta: {
  //     title: "Test",
  //   },
  // },
]
export default dashboardRoutes
