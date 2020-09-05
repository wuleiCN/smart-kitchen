import router from "./routers"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
// import { getToken } from "@/utils/auth"

NProgress.configure({ showSpinner: false })
// const whiteList = ["/login"]
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    // Message.warning('您还没有登录，请求登录后再访问该页面！')
    return next("/login")
  }
  next()
})
router.afterEach((to, from) => {
  NProgress.done()
})
