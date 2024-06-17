<script setup lang="ts">
import { ref } from "vue"
import type { MenuItem } from "primevue/menuitem"
import type { InteractEventT } from "@/types"
import texts from "@/texts"
import authStore from "@/stores/authStore"
import { go } from "@/router"
import { getUserAvatar, getUserInitials } from "@/utils"

const userMenu = ref()
const auth = authStore()
const logout = () => auth.logout()

const userMenuToggle = (event: InteractEventT) => {
  userMenu.value.toggle(event)
}

const userMenuItems: MenuItem[] = [
  {
    label: texts.dashboardLayout.topbar.userProfileMenu.sections.userMenu,
    items: [
      {
        label: texts.dashboardLayout.topbar.userProfileMenu.items.userMenu.profile,
        icon: "pi pi-user",
        command: () => go("profile"),
      },
    ],
  },
  {
    label: texts.dashboardLayout.topbar.userProfileMenu.sections.auth,
    items: [
      {
        label: texts.dashboardLayout.topbar.userProfileMenu.items.auth.logout,
        icon: "pi pi-sign-out",
        command: () => logout(),
      },
    ],
  },
]
</script>

<template>
  <Avatar
    class="cursor-pointer hover:bg-primary-100 border-2 border-black bg-white"
    :label="!getUserAvatar() ? getUserInitials() : undefined"
    :image="getUserAvatar() ? getUserAvatar() : undefined"
    @click="userMenuToggle"
    shape="circle"
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
