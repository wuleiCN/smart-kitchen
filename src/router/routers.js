import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "../layout/index"
Vue.use(VueRouter)

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: "/login",
    meta: { title: "登录", noCache: true },
    component: resolve => require(["@/views/Login"], resolve),
    hidden: true
  },
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
    name: "系统设置",
    meta: { title: "系统设置", icon: "el-icon-s-tools" },
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
  },
  {
    path: "/systemManage",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "系统管理",
    meta: { title: "系统管理", icon: "el-icon-setting" },
    children: [
      {
        path: "role",
        component: resolve => require(["@/views/systemManagement/role"], resolve),
        name: "系统角色管理",
        meta: { title: "系统角色管理" }
      },
      {
        path: "user",
        component: resolve => require(["@/views/systemManagement/user"], resolve),
        name: "系统用户管理",
        meta: { title: "系统用户管理" }
      }
    ]
  },
  {
    path: "/company",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "公司管理",
    meta: { title: "公司管理", icon: "el-icon-office-building" },
    children: [
      {
        path: "register",
        component: resolve => require(["@/views/companyManagement/register"], resolve),
        name: "公司注册",
        meta: { title: "公司注册" }
      },
      {
        path: "maintain",
        component: resolve => require(["@/views/companyManagement/maintain"], resolve),
        name: "公司信息维护",
        meta: { title: "公司信息维护" }
      }
    ]
  },
  {
    path: "/device",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "设备管理",
    meta: { title: "设备管理", icon: "el-icon-suitcase" },
    children: [
      {
        path: "LBJ",
        name: "报警设备管理",
        component: resolve => require(["@/views/deviceManagement"], resolve),
        meta: { title: "报警设备管理" },
        children: [
          {
            path: "Batch",
            component: resolve => require(["@/views/deviceManagement/LBJ/Batch"], resolve),
            name: "批量注册",
            meta: { title: "批量注册" }
          },
          {
            path: "Maintain",
            component: resolve => require(["@/views/deviceManagement/LBJ/Maintain"], resolve),
            name: "报警设备维护",
            meta: { title: "报警设备维护" }
          }
        ]
      },
      {
        path: "FF",
        name: "灭火设备管理",
        component: resolve => require(["@/views/deviceManagement"], resolve),
        meta: { title: "灭火设备管理" },
        children: [
          {
            path: "Batch",
            component: resolve => require(["@/views/deviceManagement/FF/Batch"], resolve),
            name: "批量注册",
            meta: { title: "批量注册" }
          },
          {
            path: "Maintain",
            component: resolve => require(["@/views/deviceManagement/FF/Maintain"], resolve),
            name: "报警设备维护",
            meta: { title: "报警设备维护" }
          }
        ]
      }
    ]
  },
  {
    path: "/customer",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "客户管理",
    meta: { title: "客户管理", icon: "el-icon-user" },
    children: [
      {
        path: "register",
        component: resolve => require(["@/views/customerManagement/register"], resolve),
        name: "客户注册",
        meta: { title: "客户注册" }
      },
      {
        path: "maintain",
        component: resolve => require(["@/views/customerManagement/maintain"], resolve),
        name: "客户信息维护",
        meta: { title: "客户信息维护" }
      },
      {
        path: "area",
        component: resolve => require(["@/views/customerManagement/area"], resolve),
        name: "客户厨房区域信息",
        meta: { title: "客户厨房区域信息" }
      },
      {
        path: "device",
        component: resolve => require(["@/views/customerManagement/device"], resolve),
        name: "客户设备信息",
        meta: { title: "客户设备信息" }
      }
    ]
  },
  {
    path: "/order",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "订单管理",
    meta: { title: "订单管理", icon: "el-icon-shopping-bag-1" },
    children: [
      {
        path: "monitor",
        component: resolve => require(["@/views/orderManagement/monitor"], resolve),
        name: "工单监控",
        meta: { title: "工单监控" }
      },
      {
        path: "sale",
        component: resolve => require(["@/views/orderManagement/sale"], resolve),
        name: "销售订单",
        meta: { title: "销售订单" }
      },
      {
        path: "distribution",
        component: resolve => require(["@/views/orderManagement/distribution"], resolve),
        name: "配货订单",
        meta: { title: "配货订单" }
      },
      {
        path: "construction",
        component: resolve => require(["@/views/orderManagement/construction"], resolve),
        name: "施工工单",
        meta: { title: "施工工单" }
      },
      {
        path: "maintenance",
        component: resolve => require(["@/views/orderManagement/maintenance"], resolve),
        name: "维保工单",
        meta: { title: "维保工单" }
      },
      {
        path: "repair",
        component: resolve => require(["@/views/orderManagement/repair"], resolve),
        name: "维修订单",
        meta: { title: "维修订单" }
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
