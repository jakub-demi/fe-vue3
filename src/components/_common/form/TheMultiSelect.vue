<script setup lang="ts">
import type { SelectOptionOrValueT, SelectOptionT } from "@/types"
import type { MultiSelectPassThroughOptions } from "primevue/multiselect"

type PropsT = {
  options: SelectOptionT[]
  labelText?: string
  optionLabel?: SelectOptionOrValueT
  optionValue?: SelectOptionOrValueT
  showFilter?: boolean
  placeholder?: string
  maxSelectedLabels?: number
  pt?: MultiSelectPassThroughOptions
  classWrapper?: string
  classMultiSelect?: string
  disabled?: boolean
  showToggleAll?: boolean
  unselectableKeys?: (number | string)[]
}

withDefaults(defineProps<PropsT>(), {
  optionLabel: "option",
  optionValue: "value",
  showFilter: false,
  classWrapper: "",
  classMultiSelect: "",
  disabled: false,
  showToggleAll: true,
})

const model = defineModel("model", { type: Array<number | string>, required: true })
const error = defineModel("error", { type: Array<string>, required: false })

const clearError = () => error.value && (error.value = undefined)
</script>

<template>
  <div :class="['flex flex-col gap-1', classWrapper]">
    <label v-if="labelText">{{ labelText }}</label>
    <MultiSelect
      :disabled="disabled"
      v-model="model"
      :options="options"
      :filter="showFilter"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="placeholder"
      :max-selected-labels="maxSelectedLabels"
      :pt="pt"
      :class="classMultiSelect"
      :invalid="error && error.length > 0"
      :show-toggle-all="showToggleAll"
      @change="clearError"
    />
    <InlineMessage
      v-if="error && error.length > 0"
      severity="error"
    >
      {{ error.toString() }}
    </InlineMessage>
  </div>
</template>
