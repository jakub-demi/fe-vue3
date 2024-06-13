<script setup lang="ts">
import FormWrap from "@/components/_common/form/FormWrap.vue"
import { onMounted, ref } from "vue"
import InputField from "@/components/_common/form/InputField.vue"
import { calcCost, calcCostWithVat, getCostWithVat, getSubmitBtnType } from "@/utils"
import FormButtons from "@/components/_common/form/FormButtons.vue"
import type { OrderItemDataT, OrderItemErrorsT, SelectOptionT } from "@/types"
import {
  createOrderItem,
  getOrderItemById,
  getVatRatesSelectOptions,
  updateOrderItem,
} from "@/utils/services/orderItemService"
import texts from "@/texts"
import TheSelect from "@/components/_common/form/TheSelect.vue"

type PropsT = {
  orderItemId?: number
  viewMode?: boolean
  orderId?: number
}

const props = withDefaults(defineProps<PropsT>(), {
  viewMode: false,
})

const formLoading = ref<boolean>(true)
const submitLoading = ref<boolean>(false)
const vatRatesToChooseFrom = ref<SelectOptionT[]>([])
const submitData = ref<OrderItemDataT>({
  name: "",
  vat: 0.2,
  count: 1,
})
const errors = ref<OrderItemErrorsT>({})

const handleSubmitClick = () => {
  if (props.orderItemId && props.orderId) {
    updateOrderItem(props.orderId, props.orderItemId, submitData, submitLoading, errors)
  } else if (props.orderId) {
    createOrderItem(props.orderId, submitData, submitLoading, errors)
  }
}

const costWithVat = ref<number>()

onMounted(async () => {
  await getVatRatesSelectOptions(vatRatesToChooseFrom)

  if (props.orderItemId && props.orderId) {
    await getOrderItemById(props.orderId, props.orderItemId, submitData).then(() => {
      costWithVat.value = getCostWithVat(submitData.value.cost, submitData.value.vat)
    })
  }

  formLoading.value = false
})

const calcCostWrap = (event: KeyboardEvent) => {
  submitData.value.cost = calcCost(submitData.value.vat, event)
}
const calcCostWithVatWrap = (event?: KeyboardEvent) => {
  calcCostWithVat(submitData.value.cost, submitData.value.vat, event, costWithVat)
}
</script>

<template>
  <FormWrap :form-loading="formLoading">
    <InputField
      :disabled="viewMode"
      :label-text="texts.orders.orderItems.form.labels.name"
      v-model:input="submitData.name"
      v-model:error="errors.name"
    />

    <InputField
      :disabled="viewMode"
      input-type="number"
      :label-text="texts.orders.orderItems.form.labels.count"
      v-model:input="submitData.count"
      v-model:error="errors.count"
    />

    <InputField
      :disabled="viewMode"
      input-type="number"
      :max-fraction-digits="2"
      :label-text="texts.orders.orderItems.form.labels.cost"
      v-model:input="submitData.cost"
      v-model:error="errors.cost"
      :handle-keyup="calcCostWithVatWrap"
    />

    <TheSelect
      :disabled="viewMode"
      :label-text="texts.orders.orderItems.form.labels.vat"
      :options="vatRatesToChooseFrom"
      :hide-clear="true"
      v-model:model="submitData.vat"
      v-model:error="errors.vat"
      :handle-change="() => calcCostWithVatWrap()"
    />

    <InputField
      :disabled="viewMode"
      input-type="number"
      :max-fraction-digits="2"
      :max-digit="119999"
      :label-text="texts.orders.orderItems.form.labels.costWithVat"
      v-model:input="costWithVat"
      :handle-keyup="calcCostWrap"
    />

    <FormButtons
      back-btn-route="order-items"
      :back-btn-route-params="orderId ? { orderId: orderId } : undefined"
      :handle-submit-fn="handleSubmitClick"
      :btn-type="getSubmitBtnType(orderItemId)"
      :submit-loading="submitLoading"
      :submit-hidden="!!orderItemId && viewMode"
    />
  </FormWrap>
</template>
