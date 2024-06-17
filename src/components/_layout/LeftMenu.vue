<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem"
import texts from "@/texts"
import { go } from "@/router"

const items: MenuItem[] = [
  {
    label: texts.leftMenu.dashboard,
    icon: "pi pi-home",
    command: () => go("dashboard"),
  },
  //! Orders
  {
    label: texts.leftMenu.orders.index,
    icon: "pi pi-shopping-cart",
    items: [
      {
        label: texts.leftMenu.orders.all,
        command: () => go("orders"),
      },
      {
        label: texts.leftMenu.orders.create,
        command: () => go("orders.create"),
      },
    ],
  },
  //! Order Categories
  {
    label: texts.leftMenu.orderCategories.index,
    icon: "pi pi-box",
    items: [
      {
        label: texts.leftMenu.orderCategories.all,
        command: () => go("order-categories"),
      },
      {
        label: texts.leftMenu.orderCategories.create,
        command: () => go("order-categories.create"),
      },
    ],
  },
  //! Users
  {
    label: texts.leftMenu.users.index,
    icon: "pi pi-users",
    items: [
      {
        label: texts.leftMenu.users.all,
        command: () => go("users"),
      },
      {
        label: texts.leftMenu.users.create,
        command: () => go("users.create"),
      },
    ],
  },
]
</script>

<template>
  <PanelMenu
    :pt="{ panel: { class: 'border-none' } }"
    :model="items"
    multiple
  />
</template>
