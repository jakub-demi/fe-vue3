import { ref } from "vue"
import type { Ref } from "vue"
import type { SelectOptionT, UserT } from "@/types"
import doAxios from "@/utils/doAxios"

export const getUsers = async (users: Ref<UserT[]>) => {
  await doAxios("/users", "get", true).then((res) => (users.value = res.data.data))
}

export const getUsersSelectOptions = (usersOptions: Ref<SelectOptionT[]>) => {
  const users = ref<UserT[]>([])
  getUsers(users).then(() => {
    users.value.forEach((user) => {
      usersOptions.value.push({
        option: user.fullName,
        value: user.id,
      })
    })
  })
}
