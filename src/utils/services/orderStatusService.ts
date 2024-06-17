import doAxios from "@/utils/doAxios"
import { handleResData, setAxiosErrorToast } from "@/utils"
import type { Ref } from "vue"
import type { OrderStatusHistoryT, OrderStatusT, SelectOptionT } from "@/types"
import { ref } from "vue"

export const getOrderStatuses = async (orderStatuses: Ref<OrderStatusT[]>) => {
  await doAxios("/order-statuses", "get", true).then((res) => {
    handleResData(res, orderStatuses)
  })
}

export const getOrderStatusesSelectOptions = async (orderStatusesOptions: Ref<SelectOptionT[]>) => {
  const orderStatuses = ref<OrderStatusT[]>([])
  await getOrderStatuses(orderStatuses).then(() => {
    orderStatuses.value.forEach((orderStatus) => {
      orderStatusesOptions.value.push({
        option: orderStatus.value,
        value: orderStatus.value,
      })
    })
  })
}

export const getOrderStatusesForOrder = async (
  orderId: number,
  orderStatuses: Ref<OrderStatusHistoryT[]>
) => {
  doAxios(`/orders/${orderId}/status-history`, "get", true)
    .then((res) => {
      orderStatuses.value = res.data.data as OrderStatusHistoryT[]
    })
    .catch(setAxiosErrorToast)
}
