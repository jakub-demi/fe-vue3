<script setup lang="ts">
import OrderItemForm from "@/components/pages/dashboard/orders/order-items/OrderItemForm.vue"
import { useRoute } from "vue-router"
import { handleWrongRequest, intParseWithCheck } from "@/utils"
import type { RouteParamT } from "@/types"
import { onMounted } from "vue"

const route = useRoute()
const orderItemId = intParseWithCheck(route.params.id as RouteParamT)
const orderId = intParseWithCheck(route.params.orderId as RouteParamT)

onMounted(() => {
  ;(!orderItemId || !orderId) &&
    handleWrongRequest(
      orderId ? "order-items" : "orders",
      orderId ? { orderId: orderId } : undefined
    )
})
</script>

<template>
  <OrderItemForm
    :order-item-id="orderItemId"
    :order-id="orderId"
    :view-mode="true"
  />
</template>
