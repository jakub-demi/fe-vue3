<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import type {
  ButtonSubmitTypeT,
  ButtonTypeT,
  OrderDataT,
  OrderDatesT,
  OrderErrorsT,
  SelectOptionT,
} from "@/types"
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
import log, { watchLog } from "@/utils/log"
import { getUsersSelectOptions } from "@/utils/services/userService"
import { getOrderCategoriesSelectOptions } from "@/utils/services/categoryService"
import TheMultiSelect from "@/components/_common/form/TheMultiSelect.vue"
import FormButtons from "@/components/_common/form/FormButtons.vue"

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

const errors = ref<OrderErrorsT>({})

const goBack = () => router.push({ name: "orders" })

const handleSubmitClick = () => {
  if (props.id) {
    updateOrder(props.id, submitData, submitLoading, errors)
  } else {
    createOrder(submitData, submitLoading, errors)
  }
}

const submitType = (): ButtonSubmitTypeT => (props.id ? "update" : "create")

watchLog(submitData) //todo:dev remove

watch(
  () => props.id,
  (orderId) => {
    log("watch for props.id run") //todo:dev remove

    if (!orderId) return

    getOrderById(orderId, submitData, originalDates, formLoading)
  }
)

onMounted(() => {
  log("OrderForm - onMounted run") //todo:dev remove

  if (props.id) {
    getOrderById(props.id, submitData, originalDates, formLoading)
  }

  getUsersSelectOptions(usersToChooseFrom)
  getOrderCategoriesSelectOptions(categoriesToChooseFrom)
})
</script>

<template>
  <FormWrap :form-loading="formLoading">
    <DateTimePicker
      :disabled="viewMode"
      :label-text="texts.orders.form.labels.dueDate"
      v-model:model="submitData.due_date"
      v-model:error="errors.due_date"
    />

    <TheMultiSelect
      :disabled="viewMode || !isUserAdmin"
      :options="usersToChooseFrom"
      :label-text="texts.orders.form.labels.orderUsers"
      v-model:model="submitData.order_users"
      v-model:error="errors.order_users"
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
      :disabled="viewMode || !isUserAdmin"
      :label-text="texts.orders.form.labels.category"
      :placeholder="texts.orders.form.placeholders.selectCategory"
      :show-filter="categoriesToChooseFrom.length > 1"
      :options="categoriesToChooseFrom"
      v-model:model="submitData.category_id"
      v-model:error="errors.category_id"
    />

    <!--    <div class="inline-flex">-->
    <!--      <TheButton-->
    <!--        :handle-click="goBack"-->
    <!--        :text="texts.buttons.back"-->
    <!--      />-->
    <!--      <TheButton-->
    <!--        :disabled="!!id && viewMode"-->
    <!--        :loading="submitLoading"-->
    <!--        :handle-click="handleSubmitClick"-->
    <!--        :type="submitType()"-->
    <!--        class-name="ml-1"-->
    <!--      />-->
    <!--    </div>-->

    <FormButtons
      :handle-back-fn="goBack"
      :handle-submit-fn="handleSubmitClick"
      :btn-type="submitType()"
      :submit-loading="submitLoading"
      :submit-hidden="!!id && viewMode"
    />
  </FormWrap>
</template>
