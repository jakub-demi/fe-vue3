<script setup lang="ts">
import DataGrid from "@/components/dataTable/DataGrid.vue"
import { onMounted, ref } from "vue"
import texts from "@/texts"
import type { OrderCategoryDataTableT, OrderCategoryTableSlotPropsT } from "@/types"
import ActionsMenu from "@/components/dataTable/ActionsMenu.vue"
import { getOrderCategoriesForTable } from "@/utils/services/orderCategoryService"
import authStore from "@/stores/authStore"

const auth = authStore()
const isUserAdmin = !!auth.getUser?.is_admin

const orderCategoriesTable = ref<OrderCategoryDataTableT[]>([])
const loading = ref<boolean>(true)

const handleDataLoad = async () => {
  loading.value = true
  await getOrderCategoriesForTable(orderCategoriesTable)
  loading.value = false
}

onMounted(handleDataLoad)
</script>

<template>
  <DataGrid
    :value="orderCategoriesTable"
    :loading="loading"
    :create-btn-target="isUserAdmin ? 'order-categories' : undefined"
  >
    <Column
      :header="texts.orderCategories.table.headers.name"
      field="name"
    />
    <Column
      :header="texts.orderCategories.table.headers.slug"
      field="slug"
    />
    <Column :header="texts.table.headers.actions">
      <template #body="slotProps: OrderCategoryTableSlotPropsT">
        <ActionsMenu
          :id="slotProps.data.id"
          route="order-categories"
          :handle-reload-async-fn="handleDataLoad"
          :permissions="{
            view: true,
            edit: isUserAdmin,
            delete: isUserAdmin,
          }"
        />
      </template>
    </Column>
  </DataGrid>
</template>
