import doAxios from "@/utils/doAxios"
import {
  handleAccessDenied,
  handleInputErrors,
  handleResData,
  setAxiosErrorToast,
  setAxiosSuccessToast,
  unsetExcept,
} from "@/utils"
import type {
  OrderItemDataT,
  OrderItemDataTableT,
  OrderItemErrorsT,
  OrderItemT,
  SelectOptionT,
} from "@/types"
import { isRef, ref, toRaw } from "vue"
import type { Ref } from "vue"

export const getOrderItems = async (orderId: number, orderItems: Ref<OrderItemT[]>) => {
  await doAxios(`/orders/${orderId}/order-items`, "get", true)
    .then((res) => {
      handleResData(res, orderItems)
    })
    .catch((err) => {
      handleAccessDenied(err, "orders")
    })
}

export const getOrderItemsForTable = async (
  orderId: number,
  orderItemsTable: Ref<OrderItemDataTableT[]>
) => {
  const orderItems = ref<OrderItemT[]>([])

  await getOrderItems(orderId, orderItems).then(() => {
    orderItemsTable.value = orderItems.value.map((orderItem) => ({
      id: orderItem.id,
      cost: orderItem.cost,
      name: orderItem.name,
      vat: orderItem.vat,
      cost_with_vat: orderItem.cost_with_vat,
      count: orderItem.count,
    }))
  })
}

export const getVatRates = async (vatRates: Ref<number[]>) => {
  await doAxios("/vat-rates", "get", true).then((res) => {
    vatRates.value = res.data.data as number[]
  })
}

export const getVatRatesSelectOptions = async (vatRatesOptions: Ref<SelectOptionT[]>) => {
  const vatRates = ref<number[]>([])
  await getVatRates(vatRates).then(() => {
    vatRates.value.forEach((vatRate) => {
      vatRatesOptions.value.push({
        option: vatRate * 100 + " %",
        value: vatRate,
      })
    })
  })
}

export const getOrderItemById = async (
  orderId: number,
  orderItemId: number,
  dataForForm: Ref<OrderItemDataT>
) => {
  await doAxios(`/orders/${orderId}/order-items/${orderItemId}`, "get", true)
    .then((res) => {
      const data = res.data.data as OrderItemT
      unsetExcept(data, ["name", "count", "cost", "vat"])

      data.count = Number.parseFloat(String(data.count))
      data.vat = Number.parseFloat(String(data.vat))
      data.cost = Number.parseFloat(String(data.cost))

      dataForForm.value = data
    })
    .catch((err) => {
      handleAccessDenied(err, "order-items", { orderId: orderId })
    })
}

export const createOrderItem = async (
  orderId: number,
  submitData: Ref<OrderItemDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<OrderItemErrorsT>
) => {
  submitLoading.value = true

  await doAxios(`/orders/${orderId}/order-items`, "post", true, toRaw(submitData.value))
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}

export const updateOrderItem = async (
  orderId: number,
  orderItemId: number,
  submitData: Ref<OrderItemDataT> | OrderItemDataT,
  submitLoading?: Ref<boolean>,
  errorsRef?: Ref<OrderItemErrorsT>
) => {
  submitLoading && (submitLoading.value = true)

  await doAxios(
    `/orders/${orderId}/order-items/${orderItemId}`,
    "put",
    true,
    isRef(submitData) ? toRaw(submitData.value) : submitData
  )
    .then(setAxiosSuccessToast)
    .catch((err) => {
      errorsRef ? handleInputErrors(err, errorsRef) : setAxiosErrorToast(err)
    })
    .finally(() => submitLoading && (submitLoading.value = false))
}
