import { defineStore } from "pinia"
import type { ToastServiceMethods } from "primevue/toastservice"

const toastServiceStore = defineStore("toastServiceStore", {
  state: () => ({
    toast: null as ToastServiceMethods | null,
  }),
  actions: {
    setToastService(toast: ToastServiceMethods): void {
      this.toast = toast
    },
  },
})

export default toastServiceStore
