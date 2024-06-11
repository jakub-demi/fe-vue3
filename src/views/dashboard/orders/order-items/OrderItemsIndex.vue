<script setup lang="ts">
import { onMounted, ref } from "vue"
import { intParseWithCheck } from "@/utils"
import type {
  OrderItemDataTableT,
  OrderItemsTableSlotPropsT,
  RouteParamT,
  SelectOptionT,
} from "@/types"
import ActionsMenu from "@/components/dataTable/ActionsMenu.vue"
import DataGrid from "@/components/dataTable/DataGrid.vue"
import texts from "@/texts"
import { getOrderItemsForTable, getVatRatesSelectOptions } from "@/utils/services/orderItemService"
import router from "@/router"
import { useRoute } from "vue-router"
import type { DataTableRowEditCancelEvent, DataTableRowEditSaveEvent } from "primevue/datatable"
import TheSelect from "@/components/_common/form/TheSelect.vue"
import TheButton from "@/components/_common/form/TheButton.vue"

const route = useRoute()
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
  //todo:dev - add confirm window to save items to DB or decline then call handleDataLoad()
}

const handleRowEditCancel = (event: DataTableRowEditCancelEvent): void => {
  handleDataLoad()
}

onMounted(async () => {
  const orderIdParam = intParseWithCheck(route.params.orderId as RouteParamT)

  if (!orderIdParam) {
    router.replace({ name: "orders" })
    return
  }

  orderId.value = orderIdParam

  await getVatRatesSelectOptions(vatRatesOptions)

  await handleDataLoad()
})

//todo:dev
const backBtnTarget = "orders"
const createBtnTarget = "order-items"
const backBtnText = "Back"
const createBtnText = "Create"

const handleBack = () => {
  router.push({ name: backBtnTarget })
}
const handleCreate = () => {
  router.push({ name: createBtnTarget })
}
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
      <!--    <DataTable-->
      <!--      :loading="loading"-->
      <!--      :value="orderItemsTable"-->
      <!--      :rows="15"-->
      <!--      :paginator="true"-->
      <!--      :rows-per-page-options="[5, 15, 25, 35, 45]"-->
      <!--      paginator-template="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"-->
      <!--      show-gridlines-->
      <!--      class="lg:min-w-[50rem]"-->
      <!--      v-model:editing-rows="editingRows"-->
      <!--      edit-mode="row"-->
      <!--      data-key="id"-->
      <!--      @row-edit-save="handleRowEditSave"-->
      <!--      @row-edit-cancel="handleRowEditCancel"-->
      <!--    >-->
      <!--      <template-->
      <!--        v-if="backBtnTarget || createBtnTarget"-->
      <!--        #header-->
      <!--      >-->
      <!--        <div class="flex flex-row gap-2">-->
      <!--          <TheButton-->
      <!--            v-if="backBtnTarget"-->
      <!--            icon="pi pi-arrow-left"-->
      <!--            :text="backBtnText"-->
      <!--            :handle-click="handleBack"-->
      <!--          />-->
      <!--          <TheButton-->
      <!--            v-if="createBtnTarget"-->
      <!--            icon="pi pi-plus"-->
      <!--            :text="createBtnText"-->
      <!--            :handle-click="handleCreate"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </template>-->

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
        header="Edit Options"
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
      <!--    </DataTable>-->
    </DataGrid>
  </div>
</template>
