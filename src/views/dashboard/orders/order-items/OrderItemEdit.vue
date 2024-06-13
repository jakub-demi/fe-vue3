<script setup lang="ts">
import OrderItemForm from "@/components/pages/dashboard/orders/order-items/OrderItemForm.vue"
import { useRoute } from "vue-router"
import { intParseWithCheck } from "@/utils"
import type { RouteParamT } from "@/types"

const route = useRoute()
const orderItemId = intParseWithCheck(route.params.id as RouteParamT)
const orderId = intParseWithCheck(route.params.orderId as RouteParamT)
</script>

<template>
  <OrderItemForm
    :order-item-id="orderItemId"
    :order-id="orderId"
  />
</template>
