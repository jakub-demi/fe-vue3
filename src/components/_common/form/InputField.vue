<script setup lang="ts">
import type { InputTypeHTMLAttribute, PropType } from "vue"

defineProps({
  inputType: {
    type: String as PropType<InputTypeHTMLAttribute>,
    required: false,
    default: "text",
  },
  labelText: {
    type: String,
    required: false,
  },
})
const input = defineModel("input", { type: String, required: true })
const error = defineModel("error", { type: String, required: false })

const clearError = () => error.value && (error.value = undefined)
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="labelText">
      {{ labelText }}
    </label>
    <InputText
      :model-value="input"
      :type="inputType"
      @keydown="clearError"
    />
    <InlineMessage
      v-if="error"
      severity="error"
    >
      {{ error }}
    </InlineMessage>
  </div>
</template>
