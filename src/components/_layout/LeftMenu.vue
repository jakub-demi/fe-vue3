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
