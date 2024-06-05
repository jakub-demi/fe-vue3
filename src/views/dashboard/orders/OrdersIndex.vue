<script setup lang="ts">
import { onMounted, ref } from "vue"
import doAxios from "@/utils/doAxios"
import { formatDate, getAvatarForUser, getInitialsForUser, setErrorToast } from "@/utils"
import type { OrderDataTableT, OrdersTableSlotPropsT, OrderT } from "@/types"
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import IconSizeWrap from "@/components/icons/IconSizeWrap.vue"
import ActionsMenu from "@/components/dataTable/ActionsMenu.vue"
import DataGrid from "@/components/dataTable/DataGrid.vue"

const orders = ref<OrderT[]>([])
const ordersTable = ref<OrderDataTableT[]>([])
const loading = ref<boolean>(true)

onMounted(() => {
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
    .finally(() => (loading.value = false))
})

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
              label=""
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
