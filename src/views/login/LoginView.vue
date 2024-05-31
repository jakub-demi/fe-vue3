<script setup lang="ts">
import texts from "@/texts"
import { ref } from "vue"
import type { CredentialsT } from "@/types"
import { forgotPassword } from "@/utils/auth"
import authStore from "@/stores/authStore"

const auth = authStore()

const credentials = ref<CredentialsT>({ email: "", password: "" })
const loginErrors = ref<string | undefined>()

const btnItems = [
  {
    label: texts.login.splitBtn.forgotPassword,
    command: () => {
      forgotPassword()
    },
  },
]

const handleLoginErrors = (errorMsg?: string) => {
  if (!errorMsg) return

  loginErrors.value = errorMsg
}

const login = async () => handleLoginErrors(await auth.login(credentials.value))

const hideErrors = () => (loginErrors.value = undefined)
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="border-2 border-primary-600 rounded-md p-8 shadow shadow-primary w-96">
      <div class="flex flex-col gap-1">
        <div class="text-center font-extrabold text-primary-600 pb-6">
          {{ texts.login.splitBtn.loginLabel }}
        </div>
        <InputText
          autofocus
          :placeholder="texts.login.inputs.email"
          v-model="credentials.email"
          @change="hideErrors"
          @keydown.enter="login"
        />
        <Password
          :feedback="false"
          :placeholder="texts.login.inputs.password"
          v-model="credentials.password"
          @change="hideErrors"
          @keydown.enter="login"
          :pt="{ root: { class: '*:w-full' } }"
        />

        <Message
          v-if="loginErrors"
          severity="error"
          @close="hideErrors"
          >{{ loginErrors }}</Message
        >
        <div
          v-else
          class="mb-10"
        />

        <SplitButton
          @click="login"
          :label="texts.login.splitBtn.loginLabel"
          :model="btnItems"
        />
      </div>
    </div>
  </div>
</template>
