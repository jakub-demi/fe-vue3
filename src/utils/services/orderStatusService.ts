import doAxios from "@/utils/doAxios"
import { handleResData } from "@/utils"
import type { Ref } from "vue"
import type { OrderStatusT, SelectOptionT } from "@/types"
import { ref } from "vue"

export const getOrderStatuses = async (orderStatuses: Ref<OrderStatusT[]>) => {
  await doAxios("/order-statuses", "get", true).then((res) => {
    handleResData(res, orderStatuses)
  })
}

export const getOrderStatusesSelectOptions = (orderStatusesOptions: Ref<SelectOptionT[]>) => {
  const orderStatuses = ref<OrderStatusT[]>([])
  getOrderStatuses(orderStatuses).then(() => {
    orderStatuses.value.forEach((orderStatus) => {
      orderStatusesOptions.value.push({
        option: orderStatus.value,
        value: orderStatus.value,
      })
    })
  })
}
