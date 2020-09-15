import Vue from "vue"
import App from "./App.vue"
import router from "./router/routers"
import store from "./store"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "../src/assets/style/index.scss"
import "./router/index"
import { Message } from "element-ui"

Vue.use(ElementUI)
Vue.config.productionTip = false
// Vue.http.options.credentials = true
Vue.prototype.$message = Message
// 时间格式化
Vue.filter("dateFormat", function (originVal) {
  const dt = new Date(originVal * 1000)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + "").padStart(2, "0")
  const d = (dt.getDate() + "").padStart(2, "0")

  const hh = (dt.getHours() + "").padStart(2, "0")
  const mm = (dt.getMinutes() + "").padStart(2, "0")
  const ss = (dt.getSeconds() + "").padStart(2, "0")

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
