import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import PrimeVue from "primevue/config"
import router from "./router"

import ToastService from "primevue/toastservice"
import Toast from "primevue/toast"

import Tooltip from "primevue/tooltip"

import aura from "@/preset/aura-ts"

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: aura,
})
app.use(createPinia())
app.use(router)
app.use(ToastService)

app.directive("tooltip", Tooltip)

app.component("PrimeToast", Toast)

app.mount("#app")
