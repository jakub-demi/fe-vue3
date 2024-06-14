<script setup lang="ts">
import TheButton from "@/components/_common/form/TheButton.vue"
import InputField from "@/components/_common/form/InputField.vue"
import doAxios from "@/utils/doAxios"
import { handleInputErrors } from "@/utils"
import dialogStore from "@/stores/dialogStore"
import { ref } from "vue"
import texts from "@/texts"

const show = defineModel("show", { type: Boolean, required: true })

const dialog = dialogStore()

const email = ref<string>("")

const handleCancel = () => {
  show.value = false
  email.value = ""
}
const errors = ref<{ email?: string[] }>({})

const dialogClass = "w-5/6 lg:w-2/5"

const handleSend = () => {
  doAxios("/forgot-password", "post", false, { email: email.value })
    .then(() => {
      handleCancel()
      dialog.showDialogText(texts.login.forgotPassword.emailSent, dialogClass)
    })
    .catch((err) => {
      handleInputErrors(err, errors, true, texts.login.forgotPassword.header)
    })
}
</script>

<template>
  <Dialog
    v-model:visible="show"
    modal
    :header="texts.login.forgotPassword.header"
    :class="dialogClass"
    @hide="handleCancel"
  >
    <div class="mb-5">{{ texts.login.forgotPassword.description }}</div>
    <div class="flex align-items-center gap-3 mb-5">
      <InputField
        :label-text="texts.login.forgotPassword.email"
        v-model:input="email"
        v-model:error="errors.email"
        input-type="email"
        class-name="w-full"
        :autofocus="true"
        :handle-keydown-enter="() => handleSend()"
      />
    </div>
    <div class="flex justify-content-end gap-2">
      <TheButton
        :handle-click="handleSend"
        :text="texts.login.forgotPassword.buttons.send"
      />
      <TheButton
        :handle-click="handleCancel"
        :text="texts.login.forgotPassword.buttons.cancel"
      />
    </div>
  </Dialog>
</template>
