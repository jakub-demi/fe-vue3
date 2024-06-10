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
      {
        label: "Test Page",
        icon: "pi pi-list",
        command: () => go("test"),
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
