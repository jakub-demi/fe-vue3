<script setup lang="ts">
import { onMounted, ref } from "vue"
import {
  createOrderCategory,
  getOrderCategoryById,
  updateOrderCategory,
} from "@/utils/services/orderCategoryService"
import type { OrderCategoryDataT, OrderCategoryErrorsT } from "@/types"
import FormWrap from "@/components/_common/form/FormWrap.vue"
import InputField from "@/components/_common/form/InputField.vue"
import FormButtons from "@/components/_common/form/FormButtons.vue"
import { accessDeniedRedirect, getSubmitBtnType } from "@/utils"
import texts from "@/texts"
import authStore from "@/stores/authStore"

const auth = authStore()
const isUserAdmin = !!auth.getUser?.is_admin

type PropsT = {
  orderCategoryId?: number
  viewMode?: boolean
}
const props = withDefaults(defineProps<PropsT>(), {
  viewMode: false,
})

const formLoading = ref<boolean>(true)
const submitLoading = ref<boolean>(false)
const submitData = ref<OrderCategoryDataT>({
  name: "",
})
const errors = ref<OrderCategoryErrorsT>({})

const handleSubmitClick = () => {
  if (props.orderCategoryId) {
    updateOrderCategory(props.orderCategoryId, submitData, submitLoading, errors)
  } else {
    createOrderCategory(submitData, submitLoading, errors)
  }
}

onMounted(async () => {
  if (!isUserAdmin && !props.viewMode) {
    accessDeniedRedirect("order-categories")
  }

  if (props.orderCategoryId) {
    await getOrderCategoryById(props.orderCategoryId, submitData)
  }

  formLoading.value = false
})
</script>

<template>
  <FormWrap :form-loading="formLoading">
    <InputField
      :disabled="viewMode"
      :label-text="texts.orderCategories.form.labels.name"
      v-model:input="submitData.name"
      v-model:error="errors.name"
    />

    <FormButtons
      back-btn-route="order-categories"
      :handle-submit-fn="handleSubmitClick"
      :btn-type="getSubmitBtnType(orderCategoryId)"
      :submit-loading="submitLoading"
      :submit-hidden="!!orderCategoryId && viewMode"
    />
  </FormWrap>
</template>
