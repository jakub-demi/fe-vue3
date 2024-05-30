<script setup lang="ts">
import texts from "@/texts"
import { ref } from "vue"
import type { CredentialsT } from "@/types"

const btnItems = [
  {
    label: texts.login.splitBtn.forgotPassword,
    command: () => {
      //
    },
  },
]

const crendentials = ref<CredentialsT>({ email: "", password: "" })

const login = () => {
  //
}
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
          v-model="crendentials.email"
        />
        <Password
          :feedback="false"
          :placeholder="texts.login.inputs.password"
        />
        <SplitButton
          @click="login"
          :label="texts.login.splitBtn.loginLabel"
          :model="btnItems"
          v-model="crendentials.password"
        />
      </div>
    </div>
  </div>
</template>
