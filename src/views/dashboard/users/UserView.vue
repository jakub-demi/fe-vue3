<script setup lang="ts">
import { useRoute } from "vue-router"
import { handleWrongRequest, intParseWithCheck } from "@/utils"
import type { RouteParamT } from "@/types"
import { onMounted } from "vue"
import UserForm from "@/components/pages/dashboard/users/UserForm.vue"

const route = useRoute()
const param = intParseWithCheck(route.params.id as RouteParamT)

onMounted(() => {
  !param && handleWrongRequest("users")
})
</script>

<template>
  <UserForm
    :user-id="param"
    :view-mode="true"
  />
</template>
