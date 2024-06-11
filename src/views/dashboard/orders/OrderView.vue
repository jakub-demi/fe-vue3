<script setup lang="ts">
import OrderForm from "@/components/pages/dashboard/orders/OrderForm.vue"
import { useRoute } from "vue-router"
import type { RouteParamT } from "@/types"
import { intParseWithCheck, setErrorToast } from "@/utils"
import { onMounted } from "vue"
import router from "@/router"
import texts from "@/texts"

const route = useRoute()
const param = intParseWithCheck(route.params.id as RouteParamT)

onMounted(() => {
  !param &&
    router.push({ name: "orders" }).then(() => setErrorToast(texts.toast.errors.wrongRequest))
})
</script>

<template>
  <OrderForm
    :id="param"
    :view-mode="true"
  />
</template>
