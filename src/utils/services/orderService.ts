import type { Ref } from "vue"
import { ref, toRaw } from "vue"
import doAxios from "@/utils/doAxios"
import {
  formatDate,
  handleResData,
  handleInputErrors,
  setAxiosErrorToast,
  setAxiosSuccessToast,
  unset,
} from "@/utils"
import type { OrderDataT, OrderDataTableT, OrderDatesT, OrderErrorsT, OrderT } from "@/types"
import router from "@/router"

export const getOrders = async (orders: Ref<OrderT[]>) => {
  await doAxios("/orders", "get", true)
    .then((res) => {
      handleResData(res, orders)
    })
    .catch(setAxiosErrorToast)
}

export const getOrdersForTable = async (ordersTable: Ref<OrderDataTableT[]>) => {
  const orders = ref<OrderT[]>([])

  await doAxios("/orders", "get", true)
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
        current_status: order.current_status,
      }))
    })
    .catch(setAxiosErrorToast)
}

export const getOrderById = async (
  orderId: number,
  dataForForm: Ref<OrderDataT>,
  originalDates: Ref<OrderDatesT>
) => {
  let resData: OrderT = {
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
  }

  await doAxios(`/orders/${orderId}`, "get", true)
    .then((res) => {
      resData = res.data.data

      // formData
      dataForForm.value.due_date = new Date(resData.due_date)
      resData.payment_date && (dataForForm.value.payment_date = new Date(resData.payment_date))
      dataForForm.value.created_at = new Date(resData.created_at)
      dataForForm.value.customer_name = resData.customer_name
      dataForForm.value.customer_address = resData.customer_address

      // orderUsers
      dataForForm.value.order_users = []
      resData.order_users.forEach((user) => {
        dataForForm.value.order_users.push(user.id)
      })

      // dates
      originalDates.value.due_date = toRaw(dataForForm.value).due_date
      dataForForm.value.payment_date &&
        (originalDates.value.payment_date = toRaw(dataForForm.value).payment_date)
      originalDates.value.created_at = toRaw(dataForForm.value).created_at

      // category
      dataForForm.value.category_id = resData.category?.id

      // status
      dataForForm.value.status = resData.current_status?.value
    })
    .catch((err) => {
      router.replace({ name: "orders" }).then(() => setAxiosErrorToast(err))
    })
}

export const createOrder = async (
  submitData: Ref<OrderDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<OrderErrorsT>
) => {
  submitLoading.value = true

  const dataToSend = toRaw(submitData.value)
  dataToSend.due_date = formatDate(dataToSend.due_date)
  unset(dataToSend, ["status", "payment_date", "created_at"])

  await doAxios("/orders", "post", true, dataToSend)
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}

export const updateOrder = async (
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

  await doAxios(`/orders/${orderId}`, "put", true, dataToSend)
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}
