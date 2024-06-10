<script setup lang="ts">
import type { TextSizeT } from "@/types"

type PropsT = {
  text?: string
  sizeClass?: TextSizeT
  formLoader?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  formLoader: false,
})

const getSizeClass = () =>
  !props.sizeClass ? (props.formLoader ? "text-4xl" : "text-8xl") : props.sizeClass
</script>

<template>
  <div :class="['flex items-center justify-center', formLoader ? 'min-h-[50vh]' : 'min-h-screen']">
    <div :class="getSizeClass()">
      <div class="pi pi-spin pi-spinner" />
      {{ text }}
    </div>
  </div>
</template>
