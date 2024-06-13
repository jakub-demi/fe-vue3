<script setup lang="ts">
import { useRoute } from "vue-router"
import { intParseWithCheck } from "@/utils"
import type { RouteParamT } from "@/types"
import UserForm from "@/components/pages/dashboard/users/UserForm.vue"

const route = useRoute()
const param = intParseWithCheck(route.params.id as RouteParamT)
</script>

<template>
  <UserForm :user-id="param" />
</template>
