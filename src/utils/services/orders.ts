import type { Ref } from "vue"
import doAxios from "@/utils/doAxios"
import { formatDate, setErrorToast } from "@/utils"
import { ref } from "vue"
import type { OrderDataTableT, OrderT } from "@/types"

export const getOrders = (ordersTable: Ref<OrderDataTableT[]>, loadingRef: Ref<boolean>) => {
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
    .catch((err) => {
      setErrorToast(err.response.data.message)
    })
    .finally(() => (loadingRef.value = false))
}
