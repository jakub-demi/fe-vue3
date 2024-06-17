import doAxios from "@/utils/doAxios"
import type { Ref } from "vue"
import type {
  OrderCategoryDataT,
  OrderCategoryDataTableT,
  OrderCategoryErrorsT,
  OrderCategoryT,
  SelectOptionT,
} from "@/types"
import { ref, toRaw } from "vue"
import { handleInputErrors, handleResData, setAxiosErrorToast, setAxiosSuccessToast } from "@/utils"

export const getOrderCategories = async (orderCategories: Ref<OrderCategoryT[]>) => {
  await doAxios("/order-categories", "get", true)
    .then((res) => {
      handleResData(res, orderCategories)
    })
    .catch(setAxiosErrorToast)
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

export const getOrderCategoriesForTable = async (
  orderCategoriesTable: Ref<OrderCategoryDataTableT[]>
) => {
  const orderCategories = ref<OrderCategoryT[]>([])
  await getOrderCategories(orderCategories).then(
    () => (orderCategoriesTable.value = orderCategories.value)
  )
}

export const getOrderCategoryById = async (
  orderCategoryId: number,
  dataForForm: Ref<OrderCategoryDataT>
) => {
  await doAxios(`/order-categories/${orderCategoryId}`, "get", true).then((res) => {
    const data = res.data.data as OrderCategoryT
    dataForForm.value.name = data.name
  })
}

export const createOrderCategory = async (
  submitData: Ref<OrderCategoryDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<OrderCategoryErrorsT>
) => {
  submitLoading.value = true
  errorsRef.value = {}

  await doAxios("/order-categories", "post", true, toRaw(submitData.value))
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}

export const updateOrderCategory = async (
  orderCategoryId: number,
  submitData: Ref<OrderCategoryDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<OrderCategoryErrorsT>
) => {
  submitLoading.value = true
  errorsRef.value = {}

  doAxios(`/order-categories/${orderCategoryId}`, "put", true, toRaw(submitData.value))
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}
