<script setup lang="ts">
import type { PropType } from "vue"

defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<"submit" | "button">,
    required: false,
    default: "button",
  },
  handleClick: {
    type: Function,
    required: false,
    default: () => void 0,
  },
  className: {
    type: String,
    required: false,
    default: "",
  },
})
</script>

<template>
  <Button
    :type="type"
    @click="handleClick"
    :class="className"
  >
    {{ text }}
  </Button>
</template>
