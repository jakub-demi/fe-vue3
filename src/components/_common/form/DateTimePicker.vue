<script setup lang="ts">
import type { PropType } from "vue"
import type { CalendarPassThroughOptions } from "primevue/calendar"
import type { PVCalendarModelT } from "@/types/primevue"

type PropsT = {
  minDate?: Date
  labelText?: string
  disabled?: boolean
  classWrapper?: string
  classLabel?: string
  classPicker?: string
  pt?: CalendarPassThroughOptions
}

withDefaults(defineProps<PropsT>(), {
  disabled: false,
  classWrapper: "",
  classPicker: "",
})

const model = defineModel("model", { type: Date as PropType<PVCalendarModelT>, required: true })
const error = defineModel("error", { type: Array<string>, required: false })

const clearError = () => error.value && (error.value = undefined)
</script>

<template>
  <div :class="['flex flex-col gap-1', classWrapper]">
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
      :invalid="error && error.length > 0"
      :pt="pt"
      :class="classPicker"
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
