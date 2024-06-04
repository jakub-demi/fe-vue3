<script setup lang="ts">
import { RouterView } from "vue-router"
import toastServiceStore from "@/stores/toastServiceStore"
import { onMounted } from "vue"
import { useToast } from "primevue/usetoast"

onMounted(() => {
  toastServiceStore().setToastService(useToast())
})
</script>

<template>
  <PrimeToast position="bottom-right" />
  <RouterView />
</template>
