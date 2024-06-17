<script setup lang="ts">
import OrderCategoryForm from "@/components/pages/dashboard/order-categories/OrderCategoryForm.vue"
import { useRoute } from "vue-router"
import type { RouteParamT } from "@/types"
import { intParseWithCheck } from "@/utils"

const route = useRoute()
const param = intParseWithCheck(route.params.id as RouteParamT)
</script>

<template>
  <OrderCategoryForm :order-category-id="param" />
</template>
