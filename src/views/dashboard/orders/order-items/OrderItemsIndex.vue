<script setup lang="ts">
import { onMounted, ref } from "vue"
import { areObjectsEqual, handleWrongRequest, intParseWithCheck } from "@/utils"
import type {
  OrderItemDataT,
  OrderItemDataTableT,
  OrderItemsTableSlotPropsT,
  RouteParamT,
  SelectOptionT,
} from "@/types"
import ActionsMenu from "@/components/dataTable/ActionsMenu.vue"
import DataGrid from "@/components/dataTable/DataGrid.vue"
import texts from "@/texts"
import {
  getOrderItemsForTable,
  getVatRatesSelectOptions,
  updateOrderItem,
} from "@/utils/services/orderItemService"
import { useRoute } from "vue-router"
import type { DataTableRowEditCancelEvent, DataTableRowEditSaveEvent } from "primevue/datatable"
import dialogStore from "@/stores/dialogStore"

const route = useRoute()
const dialog = dialogStore()

const orderId = ref<number>(-1)

const orderItemsTable = ref<OrderItemDataTableT[]>([])
const loading = ref<boolean>(true)

const vatRatesOptions = ref<SelectOptionT[]>([])
const editingRows = ref([])

const handleDataLoad = async () => {
  loading.value = true
  await getOrderItemsForTable(orderId.value, orderItemsTable)
  loading.value = false
}

const handleRowEditSave = (event: DataTableRowEditSaveEvent): void => {
  const oldData = event.data as OrderItemDataTableT
  const newData = event.newData as OrderItemDataTableT

  if (areObjectsEqual(oldData, newData)) {
    handleDataLoad()
    return
  }

  const orderItemId = oldData.id

  const save = () => {
    const data: OrderItemDataT = {
      vat: newData.vat,
      name: newData.name,
      count: newData.count,
      cost: newData.cost,
    }

    updateOrderItem(orderId.value, orderItemId, data).finally(() => handleDataLoad())
  }

  dialog.showDialog(texts.table.dialog.texts.updateRowConfirmation, save, handleDataLoad)
}

const handleRowEditCancel = (event: DataTableRowEditCancelEvent): void => {
  handleDataLoad()
}

onMounted(async () => {
  const orderIdParam = intParseWithCheck(route.params.orderId as RouteParamT)

  if (!orderIdParam) {
    handleWrongRequest("orders")
    return
  }

  orderId.value = orderIdParam

  await getVatRatesSelectOptions(vatRatesOptions)
  await handleDataLoad()
})
</script>

<template>
  <div>
    <DataGrid
      :value="orderItemsTable"
      :loading="loading"
      create-btn-target="order-items"
      back-btn-target="orders"
      :handle-row-edit-save="handleRowEditSave"
      :handle-row-edit-cancel="handleRowEditCancel"
      edit-mode="row"
      data-key="id"
      v-model:editing-rows="editingRows"
    >
      <Column
        :sortable="true"
        field="name"
        :header="texts.orders.orderItems.table.headers.name"
        class="w-[14%]"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column
        :sortable="true"
        field="count"
        :header="texts.orders.orderItems.table.headers.count"
        class="w-[14%]"
      >
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" />
        </template>
      </Column>
      <Column
        :sortable="true"
        field="cost"
        :header="texts.orders.orderItems.table.headers.cost"
        class="w-[14%]"
      >
        <template #body="slotProps: OrderItemsTableSlotPropsT">
          {{ slotProps.data.cost }}&nbsp;€
        </template>
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" />
        </template>
      </Column>
      <Column
        :sortable="true"
        field="vat"
        :header="texts.orders.orderItems.table.headers.vat"
        class="w-[14%]"
      >
        <template #body="slotProps: OrderItemsTableSlotPropsT">
          {{ slotProps.data.vat * 100 }}&nbsp;%
        </template>
        <template #editor="{ data, field }">
          <Dropdown
            :options="vatRatesOptions"
            v-model="data[field]"
            option-label="option"
            option-value="value"
          >
            <template #value="slotProps">{{ slotProps.value * 100 }}&nbsp;%</template>
            <template #option="slotProps">
              {{ slotProps.option["option"] }}
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column
        :sortable="true"
        field="cost_with_vat"
        :header="texts.orders.orderItems.table.headers.costWithVat"
        class="w-[14%]"
      >
        <template #body="slotProps: OrderItemsTableSlotPropsT">
          {{ slotProps.data.cost_with_vat }}&nbsp;€
        </template>
      </Column>
      <Column
        :header="texts.table.headers.editOptions"
        :rowEditor="true"
        class="text-center w-[14%]"
      />
      <Column
        :header="texts.table.headers.actions"
        class="w-[14%]"
      >
        <template #body="slotProps: OrderItemsTableSlotPropsT">
          <ActionsMenu
            :id="slotProps.data.id"
            route="order-items"
            :handle-reload-async-fn="handleDataLoad"
            :ext-axios-delete-path="`/orders/${orderId}/order-items/${slotProps.data.id}`"
          />
        </template>
      </Column>
    </DataGrid>
  </div>
</template>
