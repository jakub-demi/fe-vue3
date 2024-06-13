<script setup lang="ts">
import type { SelectOptionT, SelectOptionOrValueT, StrKeyNumStrValT } from "@/types"
import InputError from "@/components/_common/form/InputError.vue"
import type { DropdownChangeEvent } from "primevue/dropdown"

type PropsT = {
  options: SelectOptionT[]
  placeholder?: string
  optionLabel?: SelectOptionOrValueT
  optionValue?: SelectOptionOrValueT
  showFilter?: boolean
  labelText?: string
  disabled?: boolean
  hideClear?: boolean
  handleChange?: (event: DropdownChangeEvent) => void
}

const props = withDefaults(defineProps<PropsT>(), {
  optionLabel: "option",
  optionValue: "value",
  showFilter: false,
  disabled: false,
  hideClear: false,
  handleChange: (event: DropdownChangeEvent) => void 0,
})

const model = defineModel("model", { required: true })
const error = defineModel("error", { type: Array<string>, required: false })

const textToDisplay = (value: number | string | boolean) => {
  const found = props.options.filter(
    (item) => (item as StrKeyNumStrValT)[props.optionValue] === value
  )
  return (found[0] as StrKeyNumStrValT)[props.optionLabel]
}

const onSelectChange = (event: DropdownChangeEvent) => {
  error.value = undefined
  props.handleChange(event)
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="labelText">{{ labelText }}</label>
    <Dropdown
      v-if="options.length > 0"
      :disabled="disabled"
      v-model="model"
      :options="options"
      :filter="showFilter"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="placeholder"
      :show-clear="!hideClear"
      :invalid="error && error.length > 0"
      @change="onSelectChange"
      class="min-h-10"
    >
      <template #value="slotProps">
        <div
          v-if="slotProps.value !== undefined"
          class="flex align-items-center"
        >
          <div>{{ textToDisplay(slotProps.value) }}</div>
        </div>
        <span v-else>
          {{ slotProps.placeholder }}
        </span>
      </template>

      <template #option="slotProps">
        <div class="flex align-items-center">
          <div>{{ slotProps.option[optionLabel] }}</div>
        </div>
      </template>
    </Dropdown>
    <InputError v-model:error="error" />
  </div>
</template>
