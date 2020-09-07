import router from "./routers"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Message } from "element-ui"
// import { getToken } from "@/utils/auth"
import Cookies from "js-cookie";

NProgress.configure({ showSpinner: false })
// const whiteList = ["/login"]
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path !== "/login" && !Cookies.get("TOKEN_KEY")) {
    Message.warning("您还没有登录，请求登录后再访问该页面！")
    return next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
  } else {
    next()
    NProgress.done()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
