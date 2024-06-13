<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { OrderDataT, OrderDatesT, OrderErrorsT, SelectOptionT } from "@/types"
import InputField from "@/components/_common/form/InputField.vue"
import authStore from "@/stores/authStore"
import { createOrder, getOrderById, updateOrder } from "@/utils/services/orderService"
import texts from "@/texts"
import FormWrap from "@/components/_common/form/FormWrap.vue"
import { dateIfNotEmpty, getSubmitBtnType, strLen, tomorrowDate } from "@/utils"
import DateTimePicker from "@/components/_common/form/DateTimePicker.vue"
import TheSelect from "@/components/_common/form/TheSelect.vue"
import { getUsersSelectOptions } from "@/utils/services/userService"
import { getOrderCategoriesSelectOptions } from "@/utils/services/orderCategoryService"
import TheMultiSelect from "@/components/_common/form/TheMultiSelect.vue"
import FormButtons from "@/components/_common/form/FormButtons.vue"
import { getOrderStatusesSelectOptions } from "@/utils/services/orderStatusService"

type PropsT = {
  id?: number
  viewMode?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  viewMode: false,
})

const auth = authStore()
const userId = auth.getUser?.id
const isUserAdmin = auth.getUser?.is_admin

const tomorrow = tomorrowDate()

const submitLoading = ref<boolean>(false)
const formLoading = ref<boolean>(true)

const originalDates = ref<OrderDatesT>({
  due_date: tomorrow,
  payment_date: new Date(),
  created_at: new Date(),
})

const usersToChooseFrom = ref<SelectOptionT[]>([])
const categoriesToChooseFrom = ref<SelectOptionT[]>([])
const statusesToChooseFrom = ref<SelectOptionT[]>([])

const submitData = ref<OrderDataT>({
  category_id: undefined,
  due_date: tomorrow,
  order_users: userId ? [userId] : [],
  customer_name: "",
  customer_address: "",

  status: undefined,
  created_at: new Date(),
  payment_date: undefined,
})

const errors = ref<OrderErrorsT>({})

const handleSubmitClick = () => {
  if (props.id) {
    updateOrder(props.id, submitData, submitLoading, errors)
  } else {
    createOrder(submitData, submitLoading, errors)
  }
}

onMounted(async () => {
  await getUsersSelectOptions(usersToChooseFrom)
  await getOrderCategoriesSelectOptions(categoriesToChooseFrom)
  await getOrderStatusesSelectOptions(statusesToChooseFrom)

  if (props.id) {
    await getOrderById(props.id, submitData, originalDates)
  }

  formLoading.value = false
})
</script>

<template>
  <FormWrap :form-loading="formLoading">
    <DateTimePicker
      :disabled="viewMode"
      :label-text="texts.orders.form.labels.dueDate"
      v-model:model="submitData.due_date"
      v-model:error="errors.due_date"
      :min-date="dateIfNotEmpty(originalDates.due_date)"
    />

    <div v-if="id">
      <DateTimePicker
        :disabled="viewMode"
        :label-text="texts.orders.form.labels.paymentDate"
        v-model:model="submitData.payment_date"
        v-model:error="errors.payment_date"
        :min-date="dateIfNotEmpty(originalDates.payment_date)"
      />

      <DateTimePicker
        :disabled="viewMode"
        :label-text="texts.orders.form.labels.createdAt"
        v-model:model="submitData.created_at"
        v-model:error="errors.created_at"
        :min-date="dateIfNotEmpty(submitData.created_at)"
      />
    </div>

    <TheMultiSelect
      :disabled="viewMode"
      :options="usersToChooseFrom"
      :label-text="texts.orders.form.labels.orderUsers"
      v-model:model="submitData.order_users"
      v-model:error="errors.order_users"
      :keys-must-be-selected-if-model-empty="userId && !isUserAdmin ? [userId] : []"
    />

    <InputField
      :disabled="viewMode"
      :label-text="texts.orders.form.labels.customerName"
      v-model:input="submitData.customer_name"
      v-model:error="errors.customer_name"
    />

    <InputField
      :disabled="viewMode"
      :label-text="texts.orders.form.labels.customerAddress"
      v-model:input="submitData.customer_address"
      v-model:error="errors.customer_address"
    />

    <TheSelect
      :disabled="viewMode"
      :hide-clear="!isUserAdmin && strLen(submitData.category_id) > 0"
      :label-text="texts.orders.form.labels.category"
      :placeholder="texts.orders.form.placeholders.selectCategory"
      :show-filter="categoriesToChooseFrom.length > 1"
      :options="categoriesToChooseFrom"
      v-model:model="submitData.category_id"
      v-model:error="errors.category_id"
    />

    <TheSelect
      v-if="id"
      :disabled="viewMode"
      :hide-clear="true"
      :label-text="texts.orders.form.labels.status"
      :placeholder="texts.orders.form.placeholders.selectStatus"
      :options="statusesToChooseFrom"
      v-model:model="submitData.status"
      v-model:error="errors.status"
    />

    <FormButtons
      back-btn-route="orders"
      :handle-submit-fn="handleSubmitClick"
      :btn-type="getSubmitBtnType(id)"
      :submit-loading="submitLoading"
      :submit-hidden="!!id && viewMode"
    />
  </FormWrap>
</template>
