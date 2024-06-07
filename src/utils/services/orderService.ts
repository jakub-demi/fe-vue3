import type { Ref } from "vue"
import { ref, toRaw } from "vue"
import doAxios from "@/utils/doAxios"
import {
  formatDate,
  handleInputErrors,
  setAxiosErrorToast,
  setAxiosSuccessToast,
  unset,
} from "@/utils"
import type { OrderDataT, OrderDataTableT, OrderDatesT, OrderErrorsT, OrderT } from "@/types"
import router from "@/router"

export const getOrders = async (orders: Ref<OrderT[]>) => {
  await doAxios("/orders", "get", true).then((res) => {
    orders.value = res.data.data
  })
}

export const getOrdersForTable = (
  ordersTable: Ref<OrderDataTableT[]>,
  loadingRef: Ref<boolean>
) => {
  const orders = ref<OrderT[]>([])

  doAxios("/orders", "get", true)
    .then((res) => {
      orders.value = res.data.data

      ordersTable.value = orders.value.map((order) => ({
        id: order.id,
        order_number: order.order_number,
        due_date: formatDate(order.due_date),
        payment_date: order.payment_date ? formatDate(order.payment_date) : null,
        created_at: formatDate(order.created_at),
        has_access: order.has_access,
        order_users: order.order_users,
      }))
    })
    .catch(setAxiosErrorToast)
    .finally(() => (loadingRef.value = false))
}

export const getOrderById = (
  orderId: number,
  dataForForm: Ref<OrderDataT>,
  originalDates: Ref<OrderDatesT>,
  formLoading: Ref<boolean>
) => {
  formLoading.value = true

  const resData = ref<OrderT>({
    category: undefined,
    created_at: new Date(),
    current_status: undefined,
    customer_address: "",
    customer_name: "",
    due_date: new Date(),
    has_access: false,
    id: -1,
    order_number: -1,
    order_users: [],
    payment_date: new Date(),
  })

  doAxios(`/orders/${orderId}`, "get", true)
    .then((res) => {
      resData.value = res.data.data

      // formData
      dataForForm.value.due_date = new Date(resData.value.due_date)
      resData.value.payment_date &&
        (dataForForm.value.payment_date = new Date(resData.value.payment_date))
      dataForForm.value.created_at = new Date(resData.value.created_at)
      dataForForm.value.customer_name = resData.value.customer_name
      dataForForm.value.customer_address = resData.value.customer_address

      resData.value.order_users.forEach((user) => {
        dataForForm.value.order_users.push(user.id) // formData selected users
      })

      // dates
      originalDates.value.due_date = toRaw(dataForForm.value).due_date
      originalDates.value.payment_date &&
        (originalDates.value.payment_date = toRaw(dataForForm.value).payment_date)
      originalDates.value.created_at = toRaw(dataForForm.value).created_at
    })
    .catch((err) => {
      router.push({ name: "orders" }).then(() => setAxiosErrorToast(err))
    })
    .finally(() => (formLoading.value = false))
}

export const createOrder = (
  submitData: Ref<OrderDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<OrderErrorsT>
) => {
  submitLoading.value = true

  const dataToSend = toRaw(submitData.value)
  dataToSend.due_date = formatDate(dataToSend.due_date)
  unset(dataToSend, ["status", "payment_date", "created_at"])

  doAxios("/orders", "post", true, dataToSend)
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}

export const updateOrder = (
  orderId: number,
  submitData: Ref<OrderDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<OrderErrorsT>
) => {
  submitLoading.value = true

  const dataToSend = toRaw(submitData.value)
  dataToSend.due_date = formatDate(dataToSend.due_date)
  dataToSend.payment_date && (dataToSend.payment_date = formatDate(dataToSend.payment_date))
  dataToSend.created_at = formatDate(dataToSend.created_at)

  doAxios(`/orders/${orderId}`, "put", true, dataToSend)
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}
