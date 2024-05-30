<script setup lang="ts">
import texts from "@/texts"
import { ref } from "vue"
import type { CredentialsT } from "@/types"
import doAxios from "@/utils/doAxios"
import { forgotPassword, login } from "@/utils/auth"

const btnItems = [
  {
    label: texts.login.splitBtn.forgotPassword,
    command: () => {
      forgotPassword()
    },
  },
]

const credentials = ref<CredentialsT>({ email: "", password: "" })
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="border-2 border-primary-600 rounded-md p-8 shadow shadow-primary">
      <div class="flex flex-col gap-1">
        <div class="text-center font-extrabold text-primary-600 pb-6">
          {{ texts.login.splitBtn.loginLabel }}
        </div>
        <InputText
          autofocus
          :placeholder="texts.login.inputs.email"
          v-model="credentials.email"
        />
        <Password
          :feedback="false"
          :placeholder="texts.login.inputs.password"
          v-model="credentials.password"
        />
        <SplitButton
          @click="() => login(credentials)"
          :label="texts.login.splitBtn.loginLabel"
          :model="btnItems"
        />
      </div>
    </div>
  </div>
</template>
