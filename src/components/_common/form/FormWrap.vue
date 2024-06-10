<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import texts from "@/texts"
import PreLoader from "@/components/_common/PreLoader.vue"

defineSlots()

type PropsT = {
  formLoading?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  formLoading: false,
})

const loading = ref<boolean>(false)

onMounted(() => (loading.value = props.formLoading))
watch(
  () => props.formLoading,
  () => (loading.value = props.formLoading)
)
</script>

<template>
  <div v-if="loading">
    <PreLoader
      :form-loader="true"
      :text="texts.formWrap.loading"
    />
  </div>
  <div
    v-else
    class="flex flex-col gap-2 lg:px-36"
  >
    <slot />
  </div>
</template>
