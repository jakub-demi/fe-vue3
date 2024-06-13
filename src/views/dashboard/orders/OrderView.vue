<script setup lang="ts">
import OrderForm from "@/components/pages/dashboard/orders/OrderForm.vue"
import { useRoute } from "vue-router"
import type { RouteParamT } from "@/types"
import { handleWrongRequest, intParseWithCheck } from "@/utils"
import { onMounted } from "vue"

const route = useRoute()
const param = intParseWithCheck(route.params.id as RouteParamT)

onMounted(() => {
  !param && handleWrongRequest("orders")
})
</script>

<template>
  <OrderForm
    :id="param"
    :view-mode="true"
  />
</template>
