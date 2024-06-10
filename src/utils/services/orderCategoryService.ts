import doAxios from "@/utils/doAxios"
import type { Ref } from "vue"
import type { OrderCategoryT, SelectOptionT } from "@/types"
import { ref } from "vue"
import { handleResData } from "@/utils"

export const getOrderCategories = async (orderCategories: Ref<OrderCategoryT[]>) => {
  await doAxios("/order-categories", "get", true).then((res) => {
    handleResData(res, orderCategories)
  })
}

export const getOrderCategoriesSelectOptions = async (
  orderCategoriesOptions: Ref<SelectOptionT[]>
) => {
  const orderCategories = ref<OrderCategoryT[]>([])
  await getOrderCategories(orderCategories).then(() => {
    orderCategories.value.forEach((orderCategory) => {
      orderCategoriesOptions.value.push({
        option: orderCategory.name,
        value: orderCategory.id,
      })
    })
  })
}
