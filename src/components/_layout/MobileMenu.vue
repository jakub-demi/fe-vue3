<script setup lang="ts">
import LeftMenu from "@/components/_layout/LeftMenu.vue"

defineProps({
  handleChange: {
    type: Function,
    required: true,
  },
})
const mobileVisible = defineModel({
  type: Boolean,
  required: true,
})
</script>

<template>
  <Sidebar
    @hide="handleChange"
    position="full"
    v-model:visible="mobileVisible"
  >
    <LeftMenu />
  </Sidebar>
</template>
