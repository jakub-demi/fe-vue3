<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import type { OrderDataT, OrderDatesT, SelectOptionT } from "@/types"
import InputField from "@/components/_common/form/InputField.vue"
import authStore from "@/stores/authStore"
import TheButton from "@/components/_common/form/TheButton.vue"
import router from "@/router"
import { createOrder, getOrderById, updateOrder } from "@/utils/services/orderService"
import texts from "@/texts"
import FormWrap from "@/components/_common/form/FormWrap.vue"
import { tomorrowDate } from "@/utils"
import DateTimePicker from "@/components/_common/form/DateTimePicker.vue"
import TheSelect from "@/components/_common/form/TheSelect.vue"
import { watchLog } from "@/utils/log"
import { getUsersSelectOptions } from "@/utils/services/userService"
import { getOrderCategoriesSelectOptions } from "@/utils/services/categoryService"

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
const formLoading = ref<boolean>(false)

const originalDates = ref<OrderDatesT>({
  due_date: new Date(),
  payment_date: null,
  created_at: new Date(),
})
// const dueDate = ref<Date>(tomorrow)

const usersToChooseFrom = ref<SelectOptionT[]>([])
const categoriesToChooseFrom = ref<SelectOptionT[]>([])

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

// const categoryOptions: SelectOptionT[] = [
//   {
//     option: "My Option",
//     value: 140,
//   },
//   {
//     option: "My Option 2",
//     value: 745
//   }
// ]

const goBack = () => router.push({ name: "orders" })

const handleSubmitClick = () => {
  if (props.id) {
    updateOrder(props.id, submitData, submitLoading) //todo:dev
  } else {
    createOrder(submitData, submitLoading)
  }
}

watchLog(submitData) //todo:dev remove

watch(
  () => props.id,
  (orderId) => {
    if (!orderId) return

    getOrderById(orderId, submitData, originalDates, formLoading)
  }
)

onMounted(() => {
  props.id !== undefined && getUsersSelectOptions(usersToChooseFrom)
  getOrderCategoriesSelectOptions(categoriesToChooseFrom)
})
</script>

<template>
  <FormWrap :form-loading="formLoading">
    <DateTimePicker
      :disabled="viewMode"
      :label-text="texts.orders.form.labels.dueDate"
      v-model:model="submitData.due_date"
    />

    <InputField
      :disabled="viewMode"
      :label-text="texts.orders.form.labels.customerName"
      v-model:input="submitData.customer_name"
    />

    <InputField
      :disabled="viewMode"
      :label-text="texts.orders.form.labels.customerAddress"
      v-model:input="submitData.customer_address"
    />

    <TheSelect
      :disabled="viewMode || !isUserAdmin"
      :label-text="texts.orders.form.labels.category"
      :show-filter="true"
      :options="categoriesToChooseFrom"
      v-model:model="submitData.category_id"
      :placeholder="texts.orders.form.placeholders.selectCategory"
    />

    <div class="inline-flex">
      <TheButton
        :handle-click="goBack"
        :text="texts.buttons.back"
      />
      <TheButton
        :loading="submitLoading"
        :handle-click="handleSubmitClick"
        :text="texts.buttons.create"
        class-name="ml-1"
      />
    </div>
  </FormWrap>
</template>
