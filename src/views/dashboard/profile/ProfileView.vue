<script setup lang="ts">
import { ref } from "vue"
import type { UserErrorT } from "@/types"
import authStore from "@/stores/authStore"
import doAxios from "@/utils/doAxios"
import { handleInputErrors } from "@/utils"
import texts from "@/texts"
import InputField from "@/components/_common/form/InputField.vue"
import { storeToRefs } from "pinia"
import TheButton from "@/components/_common/form/TheButton.vue"

const auth = authStore()

const { getUser } = storeToRefs(auth)

const errors = ref<UserErrorT>({
  email: undefined,
  firstname: undefined,
  lastname: undefined,
  avatar: undefined,
})

const save = () => {
  doAxios("/user/update-profile", "post", true, getUser)
    .then((res) => {
      auth.setUser(res.data.data)
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
      v-if="getUser"
    >
      <form @submit.prevent="save">
        <InputField
          input-type="email"
          :label-text="texts.views.userProfileMenu.profile.email"
          :input="getUser.email"
          :error="errors.email"
        />

        <InputField
          input-type="text"
          :label-text="texts.views.userProfileMenu.profile.firstname"
          :input="getUser.firstname"
          :error="errors.firstname"
        />

        <InputField
          input-type="text"
          :label-text="texts.views.userProfileMenu.profile.lastname"
          :input="getUser.lastname"
          :error="errors.lastname"
        />

        <TheButton
          :text="texts.buttons.save"
          class-name="mt-1"
        />
      </form>
    </TabPanel>
    <TabPanel header="Change Password">...change password</TabPanel>
  </TabView>
</template>
