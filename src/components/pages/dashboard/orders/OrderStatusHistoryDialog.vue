<script setup lang="ts">
import DataGrid from "@/components/dataTable/DataGrid.vue"
import { ref, watch } from "vue"
import { getOrderStatusesForOrder } from "@/utils/services/orderStatusService"
import type { OrderStatusHistoryT, OrderStatusHistoryTableSlotPropsT } from "@/types"
import texts from "@/texts"
import TheAvatar from "@/components/_common/TheAvatar.vue"
import { formatDate } from "@/utils"

const orderId = defineModel("orderId", { type: Number, required: true })
const show = defineModel("show", { type: Boolean, required: true })

const loading = ref<boolean>(true)
const orderStatuses = ref<OrderStatusHistoryT[]>([])

const handleDataLoad = async () => {
  if (!show.value) return

  loading.value = true
  await getOrderStatusesForOrder(orderId.value, orderStatuses)
  loading.value = false
}

watch(() => show.value, handleDataLoad)
</script>

<template>
  <Dialog
    v-model:visible="show"
    @hide="show = false"
    :draggable="false"
  >
    <template #header>
      {{ texts.orders.statusHistory.header }}
    </template>

    <DataGrid
      :loading="loading"
      :value="orderStatuses"
    >
      <Column
        :header="texts.orders.statusHistory.table.headers.orderNumber"
        field="order.order_number"
      />
      <Column
        :header="texts.orders.statusHistory.table.headers.status"
        field="status.value"
        sort-field="status.value"
        :sortable="true"
      >
        <template #body="slotProps: OrderStatusHistoryTableSlotPropsT">
          <span :style="`color: ${slotProps.data.status.color}`">
            {{ slotProps.data.status.value }}
          </span>
        </template>
      </Column>
      <Column
        :header="texts.orders.statusHistory.table.headers.user"
        field="user.fullName"
        sort-field="user.fullName"
        :sortable="true"
      >
        <template #body="slotProps: OrderStatusHistoryTableSlotPropsT">
          <TheAvatar
            :user="slotProps.data.user"
            :show-tooltip="true"
          />
        </template>
      </Column>
      <Column
        :header="texts.orders.statusHistory.table.headers.createdAt"
        field="created_at"
        :sortable="true"
      >
        <template #body="slotProps: OrderStatusHistoryTableSlotPropsT">
          {{ formatDate(slotProps.data.created_at) }}
        </template>
      </Column>
    </DataGrid>
  </Dialog>
</template>
