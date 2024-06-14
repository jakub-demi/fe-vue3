<script setup lang="ts">
import { useRoute } from "vue-router"
import TheButton from "@/components/_common/form/TheButton.vue"
import InputField from "@/components/_common/form/InputField.vue"
import { onMounted, ref, watch } from "vue"
import doAxios from "@/utils/doAxios"
import { handleInputErrors, objectToFormData, setErrorToast } from "@/utils"
import dialogStore from "@/stores/dialogStore"
import texts from "@/texts"

const route = useRoute()
const queryParams = route.query

const dialog = dialogStore()

const show = ref<boolean>(false)

const passwords = ref<{
  password?: string
  password_confirmation?: string
}>({})
const errors = ref<{
  password?: string[]
  password_confirmation?: string[]
}>({})

const dialogClass = "w-5/6 lg:w-2/5"

const handleCancel = () => {
  show.value = false
  passwords.value = {}
}

const handlePasswordChange = () => {
  doAxios("/reset-password", "post", false, {
    email: queryParams["email"],
    token: queryParams["token"],
    password: passwords.value.password,
    password_confirmation: passwords.value.password_confirmation,
  })
    .then(() => {
      show.value = false
      dialog.showDialogText(texts.login.resetPassword.passwordChangeSuccess, dialogClass)
    })
    .catch((err) => {
      handleInputErrors(err, errors, true, texts.login.resetPassword.header)
      passwords.value = {}
    })
}

onMounted(() => {
  if (queryParams["pwdres"] !== null) return

  if (!queryParams["email"] || !queryParams["token"]) {
    setErrorToast(
      `No ${!queryParams["email"] && !queryParams["token"] ? "email and token are" : !queryParams["email"] && queryParams["token"] ? "email is" : "token is"} present in Password Reset link!`,
      4500,
      "Password Reset"
    )
  } else {
    show.value = true
  }
})

watch(
  () => [errors.value.password, errors.value.password_confirmation],
  ([newPasswordVal, newPasswordConfirmationVal]) => {
    !newPasswordVal && (errors.value.password_confirmation = undefined)
    !newPasswordConfirmationVal && (errors.value.password = undefined)
  }
)
</script>

<template>
  <Dialog
    v-model:visible="show"
    modal
    :header="texts.login.resetPassword.header"
    :class="dialogClass"
    @hide="handleCancel"
  >
    <div class="mb-5">{{ texts.login.resetPassword.description }}</div>
    <div class="flex flex-col gap-3 mb-5">
      <InputField
        :label-text="texts.login.resetPassword.labels.password"
        v-model:input="passwords.password"
        v-model:error="errors.password"
        input-type="password"
        :autofocus="true"
        :handle-keydown-enter="() => handlePasswordChange()"
      />
      <InputField
        :label-text="texts.login.resetPassword.labels.passwordConfirmation"
        v-model:input="passwords.password_confirmation"
        v-model:error="errors.password_confirmation"
        input-type="password"
        :handle-keydown-enter="() => handlePasswordChange()"
      />
    </div>
    <div class="flex justify-content-end gap-2">
      <TheButton
        :handle-click="handlePasswordChange"
        :text="texts.login.resetPassword.buttons.change"
      />
      <TheButton
        :handle-click="handleCancel"
        :text="texts.login.resetPassword.buttons.cancel"
      />
    </div>
  </Dialog>
</template>
