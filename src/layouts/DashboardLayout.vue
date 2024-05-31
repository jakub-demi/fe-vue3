<script setup lang="ts">
// Dashboard Layout
import LeftMenu from "@/components/_layout/LeftMenu.vue"
import BellIcon from "@heroicons/vue/24/outline/BellIcon"
import Bars3Icon from "@heroicons/vue/24/outline/Bars3Icon"
import MobileMenu from "@/components/_layout/MobileMenu.vue"
import { ref } from "vue"
import { useRoute } from "vue-router"
import texts from "@/texts"
import UserProfileMenu from "@/components/_layout/topbar/UserProfileMenu.vue"

const route = useRoute()
const routeTitle: string = (route.meta.title as string | undefined) ?? "Dashboard"

const mobileVisible = ref(false)

const showMobileMenu = () => {
  mobileVisible.value = !mobileVisible.value
}
</script>

<template>
  <MobileMenu
    :model-value="mobileVisible"
    :handle-change="showMobileMenu"
  />

  <!-- ========== HEADER ========== -->
  <header
    class="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64"
  >
    <nav
      class="flex basis-full items-center w-full mx-auto px-4 sm:px-6"
      aria-label="mobile-nav"
    >
      <div class="me-5 lg:me-0 lg:hidden">
        <!-- Title <mobile only> -->
        <a
          class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
        >
          {{ routeTitle }}
        </a>
        <!-- End Title <mobile only> -->
      </div>

      <div
        class="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3"
      >
        <div class="hidden sm:block" />

        <div class="flex flex-row items-center justify-end gap-2">
          <button
            type="button"
            class="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center text-sm font-semibold rounded-full hover:bg-gray-100"
          >
            <BellIcon class="size-6" />
          </button>

          <div class="[--placement:bottom-right] relative inline-flex">
            <UserProfileMenu />
          </div>
        </div>
      </div>
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->

  <!-- ========== MAIN CONTENT ========== -->
  <!-- Mobile Menu -->
  <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
    <div class="flex justify-between items-center py-2">
      <div />

      <!-- Sidebar Button -->
      <button
        @click="showMobileMenu"
        type="button"
        class="py-2 px-3 flex justify-center items-center gap-x-1.5 text-md rounded-lg border border-gray-200 text-gray-500 hover:text-gray-600"
      >
        <Bars3Icon class="size-5" />
        {{ texts.dashboardLayout.menu }}
      </button>
      <!-- End Sidebar Button -->
    </div>
  </div>
  <!-- End Mobile Menu -->

  <!-- LeftMenu -->
  <div
    id="application-sidebar"
    class="-translate-x-full transition-all duration-300 transform w-[260px] hidden fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0"
  >
    <div class="px-8 pt-4">
      <!-- Title -->
      <a
        class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
      >
        {{ routeTitle }}
      </a>
      <!-- End Title -->
    </div>

    <nav
      class="p-6 w-full flex flex-col flex-wrap"
      aria-label="nav"
    >
      <LeftMenu />
    </nav>
  </div>
  <!-- End LeftMenu -->

  <!-- Content -->
  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <RouterView />
    </div>
  </div>
  <!-- End Content -->
  <!-- ========== END MAIN CONTENT ========== -->
</template>
