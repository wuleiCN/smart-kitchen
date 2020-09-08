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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
