<script setup lang="ts">
import texts from "@/texts"
import TheButton from "@/components/_common/form/TheButton.vue"
import type { ButtonSubmitTypeT } from "@/types"
import router from "@/router"
import type { RouteParamsRaw, RouteRecordName } from "vue-router"

type PropsT = {
  backBtnRoute: RouteRecordName
  backBtnRouteParams?: RouteParamsRaw
  handleSubmitFn: Function
  btnType: ButtonSubmitTypeT
  classWrapper?: string
  submitHidden?: boolean
  submitLoading?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  classWrapper: "",
  submitHidden: false,
  submitLoading: false,
})

const goBack = () => {
  router.push({ name: props.backBtnRoute, params: props.backBtnRouteParams })
}
</script>

<template>
  <div :class="['inline-flex', classWrapper]">
    <TheButton
      :handle-click="goBack"
      :text="texts.buttons.back"
    />
    <TheButton
      v-if="!submitHidden"
      :loading="submitLoading"
      :handle-click="handleSubmitFn"
      :type="btnType"
      class-name="ml-1"
    />
  </div>
</template>
