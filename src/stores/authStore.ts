import { defineStore } from "pinia"
import type { CredentialsT, UserT } from "@/types"
import doAxios from "@/utils/doAxios"
import router from "@/router"
import { HttpStatusE } from "@/types/enums"
import log from "@/utils/log"

const authStore = defineStore("authStore", {
  state: () => ({
    user: null as UserT | null,
  }),
  getters: {
    getUser(): UserT | null {
      return this.user
    },

    getLoginState(): boolean {
      return !!this.user
    },
  },
  actions: {
    setUser(user: UserT | null): void {
      this.user = user
    },

    async login(credentials: CredentialsT): Promise<string | undefined> {
      let loginError = undefined as string | undefined
      await doAxios("/sanctum/csrf-cookie").then(async () => {
        await doAxios("/login", "post", false, credentials)
          .then((res) => {
            if (res.status === HttpStatusE.OK || res.status === HttpStatusE.FOUND) {
              router.push({ name: "dashboard" })
            } else {
              loginError = res.statusText
            }
          })
          .catch((error) => {
            loginError = error.response?.data?.message
          })
      })

      log(loginError, "loginError")

      return loginError
    },

    logout(): void {
      doAxios("/logout", "post", false).finally(() => {
        this.user = null
        router.push({ name: "login" })
      })
    },

    async checkLoginState(): Promise<boolean> {
      await doAxios("/user", "get", true)
        .then((res) => {
          this.user = res.data.data
        })
        .catch((error) => {
          if (error.response && error.response.status === HttpStatusE.UNAUTHORIZED) {
            this.user = null
          }
        })

      return this.getLoginState
    },
  },
})

export default authStore
