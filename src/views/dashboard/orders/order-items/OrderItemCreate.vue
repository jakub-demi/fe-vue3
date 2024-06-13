<script setup lang="ts">
import OrderItemForm from "@/components/pages/dashboard/orders/order-items/OrderItemForm.vue"
import { useRoute } from "vue-router"
import type { RouteParamT } from "@/types"
import { intParseWithCheck } from "@/utils"

const route = useRoute()
const orderId = intParseWithCheck(route.params.orderId as RouteParamT)
</script>

<template>
  <OrderItemForm :order-id="orderId" />
</template>
