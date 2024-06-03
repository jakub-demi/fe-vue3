<script setup lang="ts">
import { ref } from "vue"
import type { UserErrorT, UserT } from "@/types"
import authStore from "@/stores/authStore"
import doAxios from "@/utils/doAxios"
import { buildFilesFormData, handleInputErrors, handleResData } from "@/utils"
import texts from "@/texts"
import InputField from "@/components/_common/form/InputField.vue"
import TheButton from "@/components/_common/form/TheButton.vue"
import log from "@/utils/log"

const auth = authStore()

const userData = ref<UserT | null>(...[auth.getUser])
const errors = ref<UserErrorT>({
  email: undefined,
  firstname: undefined,
  lastname: undefined,
  avatar: undefined,
})

const save = () => {
  if (!userData.value) return

  log(userData.value, "userData.value", "lightGreen", true)

  doAxios("/user/update-profile", "post", true, userData.value)
    .then((res) => {
      handleResData(res, userData, true)
      auth.setUser(userData.value)
    })
    .catch((error) => {
      handleInputErrors(error, errors)
    })
}
</script>

<template>
  <TabView>
    <TabPanel
      header="Profile"
      v-if="userData"
    >
      <form @submit.prevent="save">
        <InputField
          input-type="email"
          :label-text="texts.views.userProfileMenu.profile.email"
          :input="userData.email"
          :error="errors.email"
        />

        <InputField
          input-type="text"
          :label-text="texts.views.userProfileMenu.profile.firstname"
          :input="userData.firstname"
          :error="errors.firstname"
        />

        <InputField
          input-type="text"
          :label-text="texts.views.userProfileMenu.profile.lastname"
          :input="userData.lastname"
          :error="errors.lastname"
        />

        <TheButton
          :text="texts.buttons.save"
          type="submit"
          class-name="mt-1"
        />
      </form>
    </TabPanel>
    <TabPanel header="Change Password">...change password</TabPanel>
  </TabView>
</template>
