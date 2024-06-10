<script setup lang="ts">
import { RouterView } from "vue-router"
import toastServiceStore from "@/stores/toastServiceStore"
import { computed, onMounted } from "vue"
import { useToast } from "primevue/usetoast"
import pageLoaderStore from "@/stores/pageLoaderStore"
import PreLoader from "@/components/_common/PreLoader.vue"
import TheDialog from "@/components/_common/TheDialog.vue"

const pageLoader = pageLoaderStore()
const pageLoading = computed(() => pageLoader.loading)

onMounted(() => {
  toastServiceStore().setToastService(useToast())
})
</script>

<template>
  <PrimeToast position="bottom-right" />
  <TheDialog />

  <PreLoader v-if="pageLoading" />
  <RouterView v-else />
</template>
