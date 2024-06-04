<script setup lang="ts">
import { ref } from "vue"
import InputField from "@/components/_common/form/InputField.vue"
import TheButton from "@/components/_common/form/TheButton.vue"
import texts from "@/texts"
import type { ChangePasswordErrorsT, ChangePasswordT } from "@/types"
import doAxios from "@/utils/doAxios"
import { handleInputErrors } from "@/utils"
import authStore from "@/stores/authStore"

const logout = () => authStore().logout()

const password = ref<ChangePasswordT>({
  current_password: "",
  password: "",
  password_confirmation: "",
})
const errors = ref<ChangePasswordErrorsT>({
  current_password: undefined,
  password: undefined,
  password_confirmation: undefined,
})

const loading = ref<boolean>(false)

const changePassword = () => {
  loading.value = true

  doAxios("/user/password", "put", false, password.value)
    .then(() => logout())
    .catch((err) => {
      handleInputErrors(err, errors)
    })
    .finally(() => (loading.value = false))
}
</script>

<template>
  <form @submit.prevent="changePassword">
    <div class="flex flex-col gap-2 mb-2">
      <InputField
        input-type="password"
        :label-text="texts.views.profileView.changePassword.currentPassword"
        v-model:input="password.current_password"
        v-model:error="errors.current_password"
      />

      <InputField
        input-type="password"
        :label-text="texts.views.profileView.changePassword.newPassword"
        v-model:input="password.password"
        v-model:error="errors.password"
      />

      <InputField
        input-type="password"
        :label-text="texts.views.profileView.changePassword.newPasswordConfirmation"
        v-model:input="password.password_confirmation"
        v-model:error="errors.password_confirmation"
      />
    </div>

    <TheButton
      :loading="loading"
      type="save"
    />
  </form>
</template>
