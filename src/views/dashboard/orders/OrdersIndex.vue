<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getAvatarForUser, getInitialsForUser } from "@/utils"
import type { OrderDataTableT, OrdersTableSlotPropsT, UserT } from "@/types"
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import IconSizeWrap from "@/components/icons/IconSizeWrap.vue"
import ActionsMenu from "@/components/dataTable/ActionsMenu.vue"
import DataGrid from "@/components/dataTable/DataGrid.vue"
import { getOrders } from "@/utils/services/orders"

const ordersTable = ref<OrderDataTableT[]>([])
const loading = ref<boolean>(true)

onMounted(() => {
  getOrders(ordersTable, loading)
})

const excessiveUsers = (orderUsers: UserT[]): string => {
  const usersWhichAreLeft = orderUsers.length - 3

  return `+${usersWhichAreLeft}`
}

const showOrderItems = (id: number) => {
  //todo:dev add order items - router.push({name: 'order-items', params: { id: /*slotProps.data.*/id }})
}

const showOrderStatusHistory = (id: number) => {
  //todo:dev add order status history dialog window with order status histories
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
        header="Order Number"
      />
      <Column
        :sortable="true"
        field="due_date"
        header="Due Date"
      />
      <Column
        :sortable="true"
        field="payment_date"
        header="Payment Date"
      />
      <Column
        :sortable="true"
        field="created_at"
        header="Created At"
      />
      <Column
        field="has_access"
        header="Edit Access?"
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
        header="Order Users"
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
      <Column header="Actions">
        <template #body="slotProps: OrdersTableSlotPropsT">
          <ActionsMenu
            :id="slotProps.data.id"
            route="orders"
            :additional-actions="[
              {
                label: 'Order Items',
                icon: 'pi pi-shopping-bag',
                command: () => showOrderItems(slotProps.data.id),
              },
              {
                label: 'Status History',
                icon: 'pi pi-history',
                command: () => showOrderStatusHistory(slotProps.data.id),
              },
            ]"
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
