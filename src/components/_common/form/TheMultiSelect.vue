<script setup lang="ts">
import type { SelectOptionOrValueT, SelectOptionT } from "@/types"
import type { MultiSelectPassThroughOptions } from "primevue/multiselect"
import { watch } from "vue"
import InputError from "@/components/_common/form/InputError.vue"

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
  keysMustBeSelectedIfModelEmpty?: (number | string)[]
}

const props = withDefaults(defineProps<PropsT>(), {
  optionLabel: "option",
  optionValue: "value",
  showFilter: false,
  classWrapper: "",
  classMultiSelect: "",
  disabled: false,
  showToggleAll: true,
  keysMustBeSelectedIfModelEmpty: () => [],
})

const model = defineModel("model", { type: Array<number | string>, required: true })
const error = defineModel("error", { type: Array<string>, required: false })

const clearError = () => error.value && (error.value = undefined)

watch(
  () => model.value,
  () => {
    props.keysMustBeSelectedIfModelEmpty.forEach((key) => {
      if (!model.value.includes(key) && model.value.length < 1) {
        model.value.unshift(key)
      }
    })
  }
)
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
    <InputError v-model:error="error" />
  </div>
</template>
