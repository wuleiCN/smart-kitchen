import router from "./routers"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Message } from "element-ui"
// import Layout from "@/layout/index"
// import Empty from "@/components/Empty"
import Cookies from "js-cookie";
import store from "../store";

const whiteList = ["/login"];
NProgress.configure({ showSpinner: false })
// const whiteList = ["/login"]
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (Cookies.get("TOKEN_KEY")) {
    if (to.path === "/login") {
      next({ path: "/" })
      NProgress.done()
    } else {
      const route = await store.state.routes
      const hasRouters = route && route.length > 0
      if (hasRouters) {
        next()
      } else {
        try {
          // routerGo(to, next)
          next()
        } catch (error) {
          Message.warning("您还没有登录，请求登录后再访问该页面！")
          return next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      Message.warning("您还没有登录，请求登录后再访问该页面！")
      return next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
    }
  }
})
// async function routerGo(to, next) {
//   // console.log(1);
//   const accessRoutes = filterAsyncRouter(await store.state.routes)
//   // router.addRoutes(accessRoutes)
//   console.log(accessRoutes);
//   next({ ...to, replace: true })
// }
// function filterAsyncRouter(routers) { // 遍历后台传来的路由字符串，转换为组件对象
//   return routers || routers.route.filter(route => {
//     if (route.component) {
//       if (route.component === "Layout") { // Layout组件特殊处理
//         route.component = Layout
//       } else if (route.component === "Empty") {
//         route.component = Empty
//       } else {
//         const component = route.component
//         route.component = loadView(component)
//       }
//     }
//     if (route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children)
//     }
//     return true
//   })
// }
// function loadView(view) {
//   return (resolve) => require([`@/views/${view}`], resolve)
// }
router.afterEach((to, from) => {
  NProgress.done()
})
