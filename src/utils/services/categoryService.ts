import doAxios from "@/utils/doAxios"
import type { Ref } from "vue"
import type { OrderCategoryT, SelectOptionT } from "@/types"
import { ref } from "vue"

export const getOrderCategories = async (orderCategories: Ref<OrderCategoryT[]>) => {
  await doAxios("/order-categories", "get", true).then((res) => {
    orderCategories.value = res.data.data
  })
}

export const getOrderCategoriesSelectOptions = (orderCategoriesOptions: Ref<SelectOptionT[]>) => {
  const orderCategories = ref<OrderCategoryT[]>([])
  getOrderCategories(orderCategories).then(() => {
    orderCategories.value.forEach((orderCategory) => {
      orderCategoriesOptions.value.push({
        option: orderCategory.name,
        value: orderCategory.id,
      })
    })
  })
}
