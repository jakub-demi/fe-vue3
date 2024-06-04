<script setup lang="ts">
defineProps({
  error: {
    type: String,
    required: false,
  },
  className: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div
    v-if="error"
    :class="['text-red-600 border-2 border-red-600 rounded-md py-1 px-2', className]"
  >
    <span class="pi pi-exclamation-circle">&nbsp;{{ error }}</span>
  </div>
</template>
