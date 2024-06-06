<script setup lang="ts">
type PropsT = {
  minDate?: Date
  labelText?: string
  disabled?: boolean
}

withDefaults(defineProps<PropsT>(), {
  disabled: false,
})

const model = defineModel("model", { type: Date, required: true })
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="labelText">{{ labelText }}</label>
    <Calendar
      :disabled="disabled"
      :min-date="minDate"
      id="calendar-24h"
      v-model="model"
      showTime
      hourFormat="24"
      date-format="dd.mm.yy"
      :touch-u-i="true"
    />
  </div>
</template>
