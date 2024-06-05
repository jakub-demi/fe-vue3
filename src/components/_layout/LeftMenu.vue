<script setup lang="ts">
import router from "@/router"
import type { MenuItem } from "primevue/menuitem"
import texts from "@/texts"

const items: MenuItem[] = [
  {
    label: texts.leftMenu.dashboard,
    icon: "pi pi-home",
    command: () => {
      router.push({ name: "dashboard" })
    },
  },
  {
    label: texts.leftMenu.orders.index,
    icon: "pi pi-shopping-cart",
    items: [
      {
        label: texts.leftMenu.orders.all,
        command: () => {
          router.push({ name: "orders" })
        },
      },
      {
        label: texts.leftMenu.orders.create,
        command: () => {
          router.push({ name: "orders.create" })
        },
      },
    ],
  },
  {
    label: "Test Items",
    items: [
      {
        label: "Item 1",
        icon: "pi pi-list",
        command: () => {
          //
        },
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
