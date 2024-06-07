<script setup lang="ts">
import { ref, watch } from "vue"
import texts from "@/texts"

defineSlots()

type PropsT = {
  formLoading?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  formLoading: false,
})

const loading = ref<boolean>(false)
const loadingStr = texts.formWrap.loading

watch(
  () => props.formLoading,
  (newVal) => {
    loading.value = newVal
  }
)
</script>

<template>
  <div
    v-if="!loading"
    class="flex flex-col gap-2 lg:px-36"
  >
    <slot />
  </div>
  <div v-else>
    {{ loadingStr }}
  </div>
</template>
