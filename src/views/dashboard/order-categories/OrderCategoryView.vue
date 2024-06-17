<script setup lang="ts">
import { useRoute } from "vue-router"
import { handleWrongRequest, intParseWithCheck } from "@/utils"
import type { RouteParamT } from "@/types"
import OrderCategoryForm from "@/components/pages/dashboard/order-categories/OrderCategoryForm.vue"
import { onMounted } from "vue"

const route = useRoute()
const param = intParseWithCheck(route.params.id as RouteParamT)

onMounted(() => {
  !param && handleWrongRequest("order-categories")
})
</script>

<template>
  <OrderCategoryForm
    :order-category-id="param"
    :view-mode="true"
  />
</template>
