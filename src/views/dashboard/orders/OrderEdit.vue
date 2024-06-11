<script setup lang="ts">
import OrderForm from "@/components/pages/dashboard/orders/OrderForm.vue"
import { useRoute } from "vue-router"
import type { RouteParamT } from "@/types"
import { intParseWithCheck } from "@/utils"

const route = useRoute()
const param = intParseWithCheck(route.params.id as RouteParamT)
</script>

<template>
  <OrderForm :id="param" />
</template>
