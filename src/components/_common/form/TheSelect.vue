<script setup lang="ts">
import type { SelectOptionT, SelectOptionOrValueT, StrKeyNumStrValT } from "@/types"

type PropsT = {
  options: SelectOptionT[]
  placeholder?: string
  optionLabel?: SelectOptionOrValueT
  optionValue?: SelectOptionOrValueT
  showFilter?: boolean
  labelText?: string
  disabled?: boolean
  hideClear?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  optionLabel: "option",
  optionValue: "value",
  showFilter: false,
  disabled: false,
  hideClear: false,
})

const model = defineModel("model", { required: true })

const textToDisplay = (value: number | string) => {
  const found = props.options.filter(
    (item) => (item as StrKeyNumStrValT)[props.optionValue] === value
  )
  return (found[0] as StrKeyNumStrValT)[props.optionLabel]
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="labelText">{{ labelText }}</label>
    <Dropdown
      :disabled="disabled"
      v-model="model"
      :options="options"
      :filter="showFilter"
      :option-label="optionLabel"
      :option-value="optionValue"
      :placeholder="placeholder"
      :show-clear="!hideClear"
      class="min-h-10"
    >
      <template #value="slotProps">
        <div
          v-if="slotProps.value"
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
  </div>
</template>
