import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "../layout/index"

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/login',
  //   meta: { title: '登录', noCache: true },
  //   component: resolve => require(['@/views/login'], resolve),
  //   hidden: true
  // },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    children: [
      {
        path: "dashboard",
        component: resolve => require(["@/views/Home"], resolve),
        name: "首页",
        meta: { title: "首页", icon: "home" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    hidden: true,
    redirect: "false",
    meta: { title: "系统设置" },
    children: [
      {
        path: "data",
        component: resolve => require(["@/views/systemSettings/initData"], resolve),
        name: "数据初始化",
        meta: { title: "数据初始化" }
      },
      {
        path: "menu",
        component: resolve => require(["@/views/systemSettings/menuSettings"], resolve),
        name: "系统菜单管理",
        meta: { title: "系统菜单管理" }
      },
      {
        path: "LBJ",
        component: resolve => require(["@/views/systemSettings/LBJManage"], resolve),
        name: "报警型号设备管理",
        meta: { title: "报警型号设备管理" }
      },
      {
        path: "FF",
        component: resolve => require(["@/views/systemSettings/FFManage"], resolve),
        name: "灭火设备型号管理",
        meta: { title: "灭火设备型号管理" }
      },
      {
        path: "warning",
        component: resolve => require(["@/views/systemSettings/warningMessage"], resolve),
        name: "警告信息测试",
        meta: { title: "警告信息测试" }
      }
    ]
  }
]

const router = new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
