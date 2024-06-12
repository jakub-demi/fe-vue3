<script setup lang="ts">
import type { InputTypeHTMLAttribute, PropType } from "vue"
import type { RoundingMode } from "primevue/inputnumber"
import InputError from "@/components/_common/form/InputError.vue"

type PropsT = {
  inputType?: InputTypeHTMLAttribute
  labelText?: string
  className?: string
  disabled?: boolean
  minDigit?: number
  maxDigit?: number
  roundingMode?: RoundingMode
  minFractionDigits?: number
  maxFractionDigits?: number
  handleKeydown?: (event: KeyboardEvent) => void
  handleKeyup?: (event: KeyboardEvent) => void
  handleChange?: () => void
}

const props = withDefaults(defineProps<PropsT>(), {
  inputType: "text",
  className: "",
  disabled: false,
  minDigit: 0,
  maxDigit: 99999,
  handleKeydown: (event: KeyboardEvent) => void 0,
  handleKeyup: (event: KeyboardEvent) => void 0,
  handleChange: () => void 0,
})

const input = defineModel("input", {
  type: [String, Number] as PropType<string | number>,
  required: false,
})
const error = defineModel("error", { type: Array<string>, required: false })

const clearError = () => error.value && (error.value = undefined)

const handleKeydownPress = (event: KeyboardEvent) => {
  clearError()
  props.handleKeydown(event)
}
</script>

<template>
  <div :class="['flex flex-col gap-1', className]">
    <label v-if="labelText">
      {{ labelText }}
    </label>
    <InputText
      v-if="inputType !== 'number'"
      :disabled="disabled"
      v-model="input"
      :type="inputType"
      @keydown="(event: KeyboardEvent) => handleKeydownPress(event)"
      @keyup="(event: KeyboardEvent) => handleKeyup(event)"
      @update:model-value="handleChange"
      :invalid="error && error.length > 0"
    />
    <InputNumber
      v-if="inputType === 'number'"
      :disabled="disabled"
      v-model="input"
      :type="inputType"
      @keydown="(event: KeyboardEvent) => handleKeydownPress(event)"
      @keyup="(event: KeyboardEvent) => handleKeyup(event)"
      @update:model-value="handleChange"
      :invalid="error && error.length > 0"
      :min="minDigit"
      :max="maxDigit"
      :rounding-mode="roundingMode"
      :min-fraction-digits="minFractionDigits"
      :max-fraction-digits="maxFractionDigits"
    />
    <InputError v-model:error="error" />
  </div>
</template>
