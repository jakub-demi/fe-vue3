<script setup lang="ts">
import { buildFilesFormData, getUserAvatar, handleInputErrors, setToast } from "@/utils"
import texts from "@/texts"
import doAxios from "@/utils/doAxios"
import authStore from "@/stores/authStore"
import { ref } from "vue"
import type { UpdateProfileFormT, UserErrorT } from "@/types"
import TheButton from "@/components/_common/form/TheButton.vue"
import FileInput from "@/components/_common/form/FileInput.vue"
import InputField from "@/components/_common/form/InputField.vue"

const auth = authStore()

const userData = ref<UpdateProfileFormT | null>({
  email: auth.getUser?.email,
  firstname: auth.getUser?.firstname,
  lastname: auth.getUser?.lastname,
  avatar: undefined,
})
const errors = ref<UserErrorT>({
  email: undefined,
  firstname: undefined,
  lastname: undefined,
  avatar: undefined,
})

const loading = ref<boolean>(false)

const save = () => {
  if (!userData.value) return

  loading.value = true

  doAxios("/user/update-profile", "post", true, buildFilesFormData(userData.value))
    .then((res) => {
      setToast(res.data.message)
      auth.setUser(res.data.data)
    })
    .catch((error) => {
      handleInputErrors(error, errors)
    })
    .finally(() => (loading.value = false))
}
</script>

<template>
  <div v-if="userData">
    <Avatar
      :image="getUserAvatar()"
      :pt="{ root: { class: 'size-20' } }"
      class="mb-2 rounded-full border-2 border-black"
      shape="circle"
    />
    <form @submit.prevent="save">
      <InputField
        input-type="email"
        :label-text="texts.views.profileView.profile.email"
        v-model:input="userData.email"
        :error="errors.email"
        class-name="mb-2"
      />

      <InputField
        input-type="text"
        :label-text="texts.views.profileView.profile.firstname"
        v-model:input="userData.firstname"
        :error="errors.firstname"
        class-name="mb-2"
      />

      <InputField
        input-type="text"
        :label-text="texts.views.profileView.profile.lastname"
        v-model:input="userData.lastname"
        :error="errors.lastname"
        class-name="mb-2"
      />

      <FileInput
        :choose-label="texts.views.profileView.profile.chooseAvatar"
        v-model:file-model="userData.avatar"
        class-name="mb-2"
      />

      <TheButton
        :loading="loading"
        type="save"
      />
    </form>
  </div>
</template>
