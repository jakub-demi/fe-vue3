import { ref, toRaw } from "vue"
import type { Ref } from "vue"
import type { SelectOptionT, UserDataT, UserDataTableT, UserErrorsT, UserT } from "@/types"
import doAxios from "@/utils/doAxios"
import {
  handleInputErrors,
  handleResData,
  setAxiosErrorToast,
  setAxiosSuccessToast,
  unset,
  unsetExcept,
} from "@/utils"
import log from "@/utils/log"

export const getUsers = async (users: Ref<UserT[]>) => {
  await doAxios("/users", "get", true)
    .then((res) => handleResData(res, users))
    .catch(setAxiosErrorToast)
}

export const getUsersSelectOptions = async (usersOptions: Ref<SelectOptionT[]>) => {
  const users = ref<UserT[]>([])
  await getUsers(users).then(() => {
    users.value.forEach((user) => {
      usersOptions.value.push({
        option: user.fullName,
        value: user.id,
      })
    })
  })
}

export const getUserIsAdminSelectOptions = (isAdminSelectOptions: Ref<SelectOptionT[]>) => {
  isAdminSelectOptions.value = [
    {
      option: "User",
      value: false,
    },
    {
      option: "Admin",
      value: true,
    },
  ]
}

export const getUsersForTable = async (usersTable: Ref<UserDataTableT[]>) => {
  const users = ref<UserT[]>([])
  await getUsers(users).then(() => {
    usersTable.value = users.value.map((user) => ({
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      is_admin: user.is_admin,
    }))
  })
}

export const getUserById = async (userId: number, dataForForm: Ref<UserDataT>) => {
  await doAxios(`/users/${userId}`, "get", true)
    .then((res) => {
      const data = res.data.data as UserT
      unsetExcept(data, ["firstname", "lastname", "email", "is_admin"])

      dataForForm.value = data
    })
    .catch(setAxiosErrorToast)
}

export const createUser = async (
  submitData: Ref<UserDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<UserErrorsT>
) => {
  submitLoading.value = true
  errorsRef.value = {}

  await doAxios("/users", "post", true, toRaw(submitData.value))
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}

export const updateUser = async (
  userId: number,
  submitData: Ref<UserDataT>,
  submitLoading: Ref<boolean>,
  errorsRef: Ref<UserErrorsT>
) => {
  submitLoading.value = true
  errorsRef.value = {}

  const dataToSend = toRaw(submitData.value)

  if (dataToSend.password !== undefined && dataToSend.password.length < 1) {
    unset(dataToSend, "password")
  }
  if (
    dataToSend.password_confirmation !== undefined &&
    dataToSend.password_confirmation.length < 1
  ) {
    unset(dataToSend, "password_confirmation")
  }

  await doAxios(`/users/${userId}`, "put", true, dataToSend)
    .then(setAxiosSuccessToast)
    .catch((err) => {
      handleInputErrors(err, errorsRef)
    })
    .finally(() => (submitLoading.value = false))
}
