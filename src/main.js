import Vue from "vue"
import App from "./App.vue"
import router from "./router/routers"
import store from "./store"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "../src/assets/style/index.scss"
import "./router/index"

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
