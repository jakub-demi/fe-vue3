import doAxios from "@/utils/doAxios"
import { handleAccessDenied, handleResData } from "@/utils"
import type { OrderItemDataTableT, OrderItemT, SelectOptionT } from "@/types"
import { ref } from "vue"
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
