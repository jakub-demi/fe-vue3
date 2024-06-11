import type { RouteRecordRaw } from "vue-router"
import DashboardView from "@/views/dashboard/DashboardView.vue"
import ProfileView from "@/views/dashboard/profile/ProfileView.vue"
import OrdersIndex from "@/views/dashboard/orders/OrdersIndex.vue"
import OrderCreate from "@/views/dashboard/orders/OrderCreate.vue"
import OrderView from "@/views/dashboard/orders/OrderView.vue"
import OrderEdit from "@/views/dashboard/orders/OrderEdit.vue"
import OrderItemsIndex from "@/views/dashboard/orders/order-items/OrderItemsIndex.vue"

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
    component: OrderCreate,
    meta: {
      title: "Order - Create",
    },
  },
  {
    path: "orders/view/:id",
    name: "orders.view",
    component: OrderView,
    meta: {
      title: "Order - View",
    },
  },
  {
    path: "orders/edit/:id",
    name: "orders.edit",
    component: OrderEdit,
    meta: {
      title: "Order - Edit",
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
  {
    path: "orders/view/:orderId/items",
    name: "order-items",
    component: OrderItemsIndex,
    meta: {
      title: "Order Items",
    },
  },
]
export default dashboardRoutes
