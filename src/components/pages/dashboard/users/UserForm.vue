<script setup lang="ts">
import FormWrap from "@/components/_common/form/FormWrap.vue"
import { ref, onMounted } from "vue"
import {
  createUser,
  getUserById,
  getUserIsAdminSelectOptions,
  updateUser,
} from "@/utils/services/userService"
import type { SelectOptionT, UserDataT, UserErrorsT } from "@/types"
import InputField from "@/components/_common/form/InputField.vue"
import texts from "@/texts"
import { getSubmitBtnType } from "@/utils"
import FormButtons from "@/components/_common/form/FormButtons.vue"
import TheSelect from "@/components/_common/form/TheSelect.vue"

type PropsT = {
  userId?: number
  viewMode?: boolean
}

const props = withDefaults(defineProps<PropsT>(), {
  viewMode: false,
})

const formLoading = ref<boolean>(true)
const submitLoading = ref<boolean>(false)

const isAdminSelectOptions = ref<SelectOptionT[]>([])
const submitData = ref<UserDataT>({
  firstname: "",
  lastname: "",
  email: "",
  is_admin: false,
})
const errors = ref<UserErrorsT>({})

const handleSubmitClick = () => {
  if (props.userId) {
    updateUser(props.userId, submitData, submitLoading, errors)
  } else {
    createUser(submitData, submitLoading, errors)
  }
}

onMounted(async () => {
  getUserIsAdminSelectOptions(isAdminSelectOptions)

  if (props.userId) {
    await getUserById(props.userId, submitData)
  }

  formLoading.value = false
})
</script>

<template>
  <FormWrap :form-loading="formLoading">
    <InputField
      :disabled="viewMode"
      :label-text="texts.users.form.labels.firstname"
      v-model:input="submitData.firstname"
      v-model:error="errors.firstname"
    />

    <InputField
      :disabled="viewMode"
      :label-text="texts.users.form.labels.lastname"
      v-model:input="submitData.lastname"
      v-model:error="errors.lastname"
    />

    <InputField
      :disabled="viewMode"
      :label-text="texts.users.form.labels.email"
      v-model:input="submitData.email"
      v-model:error="errors.email"
    />

    <div
      class="flex flex-col lg:flex-row gap-2 *:w-full"
      v-if="!viewMode"
    >
      <InputField
        :label-text="texts.users.form.labels.password"
        input-type="password"
        v-model:input="submitData.password"
        v-model:error="errors.password"
      />
      <InputField
        :label-text="texts.users.form.labels.passwordConfirmation"
        input-type="password"
        v-model:input="submitData.password_confirmation"
        v-model:error="errors.password_confirmation"
      />
    </div>

    <TheSelect
      :disabled="viewMode"
      :label-text="texts.users.form.labels.isAdmin"
      :options="isAdminSelectOptions"
      :hide-clear="true"
      v-model:model="submitData.is_admin"
      v-model:error="errors.is_admin"
    />

    <FormButtons
      back-btn-route="users"
      :handle-submit-fn="handleSubmitClick"
      :btn-type="getSubmitBtnType(userId)"
      :submit-loading="submitLoading"
      :submit-hidden="!!userId && viewMode"
    />
  </FormWrap>
</template>
