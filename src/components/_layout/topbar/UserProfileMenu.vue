<script setup lang="ts">
import { ref } from "vue"
import type { MenuItem } from "primevue/menuitem"
import type { InteractEventT } from "@/types"
import { logout } from "@/utils/auth"
import texts from "@/texts"

const userMenu = ref()

const userMenuToggle = (event: InteractEventT) => {
  userMenu.value.toggle(event)
}

const userMenuItems: MenuItem[] = [
  {
    label: texts.dashboardLayout.topbar.userProfileMenu.sections.userMenu,
    items: [
      {
        label: "<TBD>",
      },
    ],
  },
  {
    label: texts.dashboardLayout.topbar.userProfileMenu.sections.auth,
    items: [
      {
        label: texts.dashboardLayout.topbar.userProfileMenu.items.auth.logout,
        icon: "pi pi-sign-out",
        command: () => {
          logout()
        },
      },
    ],
  },
]
</script>

<template>
  <Avatar
    class="cursor-pointer hover:bg-primary-100"
    label="TBD"
    @click="userMenuToggle"
    aria-haspopup="true"
    aria-controls="user_menu"
  />
  <Menu
    ref="userMenu"
    id="user_menu"
    :model="userMenuItems"
    :popup="true"
  />
</template>
