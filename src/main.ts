import "./assets/main.css"
import "@/assets/style.scss"

import { createApp } from "vue"
import { createPinia } from "pinia"

import { vMaska } from "maska/vue"
import App from "./App.vue"

import router from "./router"
import registerComponents from "../componentsLoader"
import i18n from "./app/i18n"
import ApiService from "./services/api.service"
import "@/services/axios"
import axios from "axios"

const app = createApp(App)

registerComponents(app)
app.directive("maska", vMaska)

app.use(createPinia())
app.use(router)
app.use(i18n)

const { t } = i18n.global

ApiService.mount401Interceptor(t)
axios.defaults.headers.common["lang"] = localStorage.getItem("lang")
axios.defaults.headers.common["ngrok-skip-browser-warning"] = true
app.mount("#app")
