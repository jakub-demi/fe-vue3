<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getAvatarForUser, getInitialsForUser, handlePdfDownload, setErrorToast } from "@/utils"
import type { OrderDataTableT, OrdersTableSlotPropsT, OrderStatusT, UserT } from "@/types"
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import IconSizeWrap from "@/components/icons/IconSizeWrap.vue"
import ActionsMenu from "@/components/dataTable/ActionsMenu.vue"
import DataGrid from "@/components/dataTable/DataGrid.vue"
import { getOrdersForTable } from "@/utils/services/orderService"
import texts from "@/texts"
import router from "@/router"
import type { MenuItem } from "primevue/menuitem"

const ordersTable = ref<OrderDataTableT[]>([])
const loading = ref<boolean>(true)

const handleDataLoad = async () => {
  loading.value = true
  await getOrdersForTable(ordersTable)
  loading.value = false
}

onMounted(handleDataLoad)

const excessiveUsers = (orderUsers: UserT[]): string => {
  const usersWhichAreLeft = orderUsers.length - 3

  return `+${usersWhichAreLeft}`
}

const showOrderItems = (id: number) => {
  //todo:dev add order items - router.push({name: 'order-items', params: { id: /*slotProps.data.*/id }})
  router.push({ name: "order-items", params: { orderId: id } })
}

const showOrderStatusHistory = (id: number) => {
  //todo:dev add order status history dialog window with order status histories
}

const downloadAsPdf = (orderNumber: number, orderId: number) => {
  const errMsg = handlePdfDownload(`/orders/${orderId}/generate-pdf`, `Order_${orderNumber}`)
  if (!errMsg) return

  setErrorToast(errMsg)
}

const additionalActions = (slotProps: OrdersTableSlotPropsT): MenuItem[] => {
  const actions: MenuItem[] = [
    {
      label: texts.orders.table.additionalActions.statusHistory,
      icon: "pi pi-history",
      command: () => showOrderStatusHistory(slotProps.data.id),
    },
    {
      label: texts.orders.table.additionalActions.downloadAsPdf,
      icon: "pi pi-file-pdf",
      command: () => downloadAsPdf(slotProps.data.order_number, slotProps.data.id),
    },
  ]
  if (slotProps.data.has_access) {
    actions.unshift({
      label: texts.orders.table.additionalActions.orderItems,
      icon: "pi pi-shopping-bag",
      command: () => showOrderItems(slotProps.data.id),
    })
  }
  return actions
}

const noOrderStatus: OrderStatusT = {
  value: texts.orders.table.columns.currentStatus.noStatus,
  color: "#000",
  name: texts.orders.table.columns.currentStatus.noStatus,
  slug: texts.orders.table.columns.currentStatus.noStatus,
}
</script>

<template>
  <div>
    <DataGrid
      :value="ordersTable"
      :loading="loading"
      create-btn-target="orders"
    >
      <Column
        :sortable="true"
        field="order_number"
        :header="texts.orders.table.headers.orderNumber"
      />
      <Column
        :sortable="true"
        field="due_date"
        :header="texts.orders.table.headers.dueDate"
      />
      <Column
        :sortable="true"
        field="payment_date"
        :header="texts.orders.table.headers.paymentDate"
      />
      <Column
        :sortable="true"
        field="created_at"
        :header="texts.orders.table.headers.createdAt"
      />
      <Column
        :sortable="true"
        sort-field="current_status.value"
        field="current_status"
        :header="texts.orders.table.headers.currentStatus"
      >
        <template #body="slotProps: OrdersTableSlotPropsT">
          {{
            (() => {
              !slotProps.data.current_status && (slotProps.data.current_status = noOrderStatus)
            })()
          }}
          <span
            :style="`color: ${slotProps.data.current_status.color}`"
            :class="
              slotProps.data.current_status.name ===
              texts.orders.table.columns.currentStatus.noStatus
                ? 'italic'
                : ''
            "
          >
            {{ slotProps.data.current_status.value }}
          </span>
        </template>
      </Column>
      <Column
        field="has_access"
        :header="texts.orders.table.headers.hasAccess"
      >
        <template #body="slotProps: OrdersTableSlotPropsT">
          <IconSizeWrap v-if="slotProps.data.has_access">
            <CheckIcon />
          </IconSizeWrap>
          <IconSizeWrap v-else>
            <XMarkIcon />
          </IconSizeWrap>
        </template>
      </Column>
      <Column
        field="order_users"
        :header="texts.orders.table.headers.orderUsers"
      >
        <template #body="slotProps: OrdersTableSlotPropsT">
          <AvatarGroup>
            <Avatar
              v-tooltip.bottom="user.fullName"
              v-for="user in slotProps.data.order_users.slice(0, 3)"
              :key="user.id"
              :image="getAvatarForUser(user) ? getAvatarForUser(user) : undefined"
              :label="!getAvatarForUser(user) ? getInitialsForUser(user) : undefined"
              size="large"
              shape="circle"
            />
            <Avatar
              v-if="slotProps.data.order_users.length > 3"
              :label="excessiveUsers(slotProps.data.order_users)"
              shape="circle"
              size="large"
            />
          </AvatarGroup>
        </template>
      </Column>
      <Column :header="texts.table.headers.actions">
        <template #body="slotProps: OrdersTableSlotPropsT">
          <ActionsMenu
            :id="slotProps.data.id"
            route="orders"
            :handle-reload-async-fn="handleDataLoad"
            :additional-actions="additionalActions(slotProps)"
            :permissions="{
              view: true,
              edit: slotProps.data.has_access,
              delete: slotProps.data.has_access,
            }"
          />
        </template>
      </Column>
    </DataGrid>
  </div>
</template>
