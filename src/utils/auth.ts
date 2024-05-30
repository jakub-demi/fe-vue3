import doAxios from "@/utils/doAxios"
import type { CredentialsT } from "@/types"
import router from "@/router"

export const login = (credentials: CredentialsT) => {
  doAxios("/login", "post", false, credentials)
    .then((res) => {
      //todo:dev - store to authStore
    })
    .catch((error) => {
      //todo:dev - return errors to login page
    })
}

export const logout = () => {
  doAxios("/logout", "post", false).finally(() => {
    //todo:dev - empty out authStore
    router.push({ name: "login" })
  })
}

export const forgotPassword = () => {
  //
}

export const resetPassword = () => {
  //
}
