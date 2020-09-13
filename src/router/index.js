import router from "./routers"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { Message } from "element-ui"
import Layout from "@/layout/index"
import Empty from "@/components/Empty"
import Cookies from "js-cookie";
import store from "../store";
import { getMenus } from "@/api/menus"
import { removeSession } from "@/utils/auth.js"
import { setSession } from "@/utils/auth.js"

const whiteList = ["/login"];
NProgress.configure({ showSpinner: false })
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (Cookies.get("TOKEN_KEY")) {
    if (to.path === "/login") {
      next({ path: "/" })
      NProgress.done()
    } else {
      if (!store.state.userInfo) {
        store.dispatch("GetInfo").then(res => {
          console.log(store.state.userInfo);
          routerGo(to, next)
        }).catch(err => {
          console.log(err);
          removeSession("USER_INFO")
          Cookies.remove("TOKEN_KEY")
          location.reload()
        })
      } else if (store.state.loadMenus) {
        store.dispatch("updateLoadMenus", false).then(res => {
          console.log("menus");
        })
        next()
      } else {
        store.dispatch("updateLoadMenus", true).then(res => {
          console.log("menus");
        })
        console.log(store.state.userInfo, store.state.loadMenus);
        routerGo(to, next)
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
async function routerGo(to, next) {
  getMenus().then(data => {
    console.log(data.data);
    setSession("ROUTES_KEY", data.data)
    const accessRoutes = filterAsyncRouter(data.data.data)
    store.dispatch("getRoutesSync", accessRoutes).then(() => {
      router.addRoutes(accessRoutes)
      console.log(accessRoutes, 1);
      next({ ...to, replace: true })
    })
  })
}
function filterAsyncRouter(routers) { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(route => {
    if (route.component) {
      if (route.component === "Layout") { // Layout组件特殊处理
        route.component = Layout
      } else if (route.component === "Empty") {
        route.component = Empty
      } else {
        const component = route.component
        route.component = loadView(component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}
function loadView(view) {
  return (resolve) => require([`@/views${view}`], resolve)
}
router.afterEach((to, from) => {
  NProgress.done()
})
