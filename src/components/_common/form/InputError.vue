<script setup lang="ts">
const error = defineModel("error", { type: Array<string>, required: false })
</script>

<template>
  <InlineMessage
    v-if="error && error.length > 0"
    severity="error"
  >
    {{ error.toString() }}
  </InlineMessage>
</template>
