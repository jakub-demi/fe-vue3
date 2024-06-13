import type { RouteRecordRaw } from "vue-router"
import DashboardView from "@/views/dashboard/DashboardView.vue"
import ProfileView from "@/views/dashboard/profile/ProfileView.vue"
import OrdersIndex from "@/views/dashboard/orders/OrdersIndex.vue"
import OrderCreate from "@/views/dashboard/orders/OrderCreate.vue"
import OrderView from "@/views/dashboard/orders/OrderView.vue"
import OrderEdit from "@/views/dashboard/orders/OrderEdit.vue"
import OrderItemsIndex from "@/views/dashboard/orders/order-items/OrderItemsIndex.vue"
import OrderItemCreate from "@/views/dashboard/orders/order-items/OrderItemCreate.vue"
import OrderItemView from "@/views/dashboard/orders/order-items/OrderItemView.vue"
import OrderItemEdit from "@/views/dashboard/orders/order-items/OrderItemEdit.vue"
import UsersIndex from "@/views/dashboard/users/UsersIndex.vue"
import UserCreate from "@/views/dashboard/users/UserCreate.vue"
import UserView from "@/views/dashboard/users/UserView.vue"
import UserEdit from "@/views/dashboard/users/UserEdit.vue"

const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: "",
    name: "dashboard",
    component: DashboardView,
    meta: {
      title: "Dashboard",
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
  //! Order Items Routes
  {
    path: "orders/view/:orderId/items",
    name: "order-items",
    component: OrderItemsIndex,
    meta: {
      title: "Order Items",
    },
  },
  {
    path: "orders/view/:orderId/items/create",
    name: "order-items.create",
    component: OrderItemCreate,
    meta: {
      title: "Order Item - Create",
    },
  },
  {
    path: "orders/view/:orderId/items/view/:id",
    name: "order-items.view",
    component: OrderItemView,
    meta: {
      title: "Order Item - View",
    },
  },
  {
    path: "orders/view/:orderId/items/edit/:id",
    name: "order-items.edit",
    component: OrderItemEdit,
    meta: {
      title: "Order Item - Edit",
    },
  },
  //! Users Routes
  {
    path: "users",
    name: "users",
    component: UsersIndex,
    meta: {
      title: "Users",
    },
  },
  {
    path: "users/create",
    name: "users.create",
    component: UserCreate,
    meta: {
      title: "User - Create",
    },
  },
  {
    path: "users/view/:id",
    name: "users.view",
    component: UserView,
    meta: {
      title: "User - View",
    },
  },
  {
    path: "users/edit/:id",
    name: "users.edit",
    component: UserEdit,
    meta: {
      title: "User - Edit",
    },
  },
]
export default dashboardRoutes
