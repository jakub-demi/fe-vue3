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
  className: {
    type: String,
    required: false,
    default: "",
  },
})
const input = defineModel("input", { type: String, required: true })
const error = defineModel("error", { type: Array<String>, required: false })

const clearError = () => error.value && (error.value = undefined)
</script>

<template>
  <div :class="['flex flex-col gap-1', className]">
    <label v-if="labelText">
      {{ labelText }}
    </label>
    <InputText
      v-model="input"
      :type="inputType"
      @keydown="clearError"
    />
    <InlineMessage
      v-if="error && error.length > 0"
      severity="error"
    >
      {{ error.toString() }}
    </InlineMessage>
  </div>
</template>
