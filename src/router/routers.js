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
export const routerMap = [
  {
    path: "/login",
    meta: { title: "登录", noCache: true },
    component: resolve => require(["@/views/Login"], resolve),
    hidden: false
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    hidden: false,
    children: [
      {
        path: "dashboard",
        component: resolve => require(["@/views/Home"], resolve),
        name: "Home",
        meta: { title: "首页", icon: "home" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "System",
    meta: { title: "系统设置", icon: "el-icon-s-tools" },
    children: [
      {
        path: "data",
        component: resolve => require(["@/views/systemSettings/initData"], resolve),
        name: "Data",
        meta: { title: "数据初始化", icon: "el-icon-coin" }
      },
      {
        path: "menu",
        component: resolve => require(["@/views/systemSettings/menuSettings"], resolve),
        name: "Menu",
        meta: { title: "系统菜单管理", icon: "el-icon-s-grid" }
      },
      {
        path: "LBJ",
        component: resolve => require(["@/views/systemSettings/LBJManage"], resolve),
        name: "LBJ",
        meta: { title: "报警型号设备管理", icon: "el-icon-bell" }
      },
      {
        path: "FF",
        component: resolve => require(["@/views/systemSettings/FFManage"], resolve),
        name: "FF",
        meta: { title: "灭火设备型号管理", icon: "el-icon-news" }
      },
      {
        path: "warning",
        component: resolve => require(["@/views/systemSettings/warningMessage"], resolve),
        name: "Warning",
        meta: { title: "警告信息测试", icon: "el-icon-warning-outline" }
      }
    ]
  },
  {
    path: "/systemManage",
    component: Layout,
    hidden: false,
    name: "SystemManage",
    meta: { title: "系统管理", icon: "el-icon-setting", menuCategory: "菜单类别", menuGroup: "菜单分组" },
    children: [
      {
        path: "role",
        component: resolve => require(["@/views/systemManagement/role"], resolve),
        name: "Role",
        meta: { title: "系统角色管理", icon: "el-icon-user-solid" }
      },
      {
        path: "user",
        component: resolve => require(["@/views/systemManagement/user"], resolve),
        name: "User",
        meta: { title: "系统用户管理", icon: "el-icon-s-custom" }
      }
    ]
  },
  {
    path: "/company",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "Company",
    meta: { title: "公司管理", icon: "el-icon-office-building" },
    children: [
      {
        path: "register",
        component: resolve => require(["@/views/companyManagement/register"], resolve),
        name: "Register",
        meta: { title: "公司注册", icon: "el-icon-folder-add" }
      },
      {
        path: "maintain",
        component: resolve => require(["@/views/companyManagement/maintain"], resolve),
        name: "Maintain",
        meta: { title: "公司信息维护", icon: "el-icon-info" }
      }
    ]
  },
  {
    path: "/device",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "Device",
    meta: { title: "设备管理", icon: "el-icon-suitcase" },
    children: [
      {
        path: "All",
        name: "All-Device",
        component: resolve => require(["@/views/deviceManagement/AllDevices"], resolve),
        meta: { title: "所有设备", icon: "el-icon-bell" }
      },
      {
        path: "LBJ",
        name: "Device-LBJ",
        component: resolve => require(["@/views/deviceManagement"], resolve),
        meta: { title: "报警设备管理", icon: "el-icon-bell" },
        children: [
          {
            path: "Batch",
            component: resolve => require(["@/views/deviceManagement/LBJ/Batch"], resolve),
            name: "LBJ-Batch",
            meta: { title: "批量注册", icon: "el-icon-position" }
          },
          {
            path: "Maintain",
            component: resolve => require(["@/views/deviceManagement/LBJ/Maintain"], resolve),
            name: "LBJ-Maintain",
            meta: { title: "报警设备维护", icon: "el-icon-position" }
          }
        ]
      },
      {
        path: "FF",
        name: "Device-FF",
        component: resolve => require(["@/views/deviceManagement"], resolve),
        meta: { title: "灭火设备管理", icon: "el-icon-c-scale-to-original" },
        children: [
          {
            path: "Batch",
            component: resolve => require(["@/views/deviceManagement/FF/Batch"], resolve),
            name: "FF-Batch",
            meta: { title: "批量注册", icon: "el-icon-position" }
          },
          {
            path: "Maintain",
            component: resolve => require(["@/views/deviceManagement/FF/Maintain"], resolve),
            name: "FF-Maintain",
            meta: { title: "灭火设备维护", icon: "el-icon-position" }
          }
        ]
      },
      {
        path: "Gateways",
        name: "Gateways",
        component: resolve => require(["@/views/deviceManagement"], resolve),
        meta: { title: "智能网关设备管理", icon: "el-icon-cpu" },
        children: [
          {
            path: "Batch",
            component: resolve => require(["@/views/deviceManagement/Gateways/Batch"], resolve),
            name: "Gateways-Batch",
            meta: { title: "批量注册", icon: "el-icon-position" }
          },
          {
            path: "Maintain",
            component: resolve => require(["@/views/deviceManagement/Gateways/Maintain"], resolve),
            name: "Gateways-Maintain",
            meta: { title: "智能网关设备维护", icon: "el-icon-position" }
          }
        ]
      },
      {
        path: "Cameras",
        name: "Cameras",
        component: resolve => require(["@/views/deviceManagement"], resolve),
        meta: { title: "摄像机设备管理", icon: "el-icon-video-camera" },
        children: [
          {
            path: "Batch",
            component: resolve => require(["@/views/deviceManagement/Cameras/Batch"], resolve),
            name: "Cameras-Batch",
            meta: { title: "批量注册", icon: "el-icon-position" }
          },
          {
            path: "Maintain",
            component: resolve => require(["@/views/deviceManagement/Cameras/Maintain"], resolve),
            name: "Cameras-Maintain",
            meta: { title: "摄像机设备维护", icon: "el-icon-position" }
          }
        ]
      },
      {
        path: "Nvrs",
        name: "Nvrs",
        component: resolve => require(["@/views/deviceManagement"], resolve),
        meta: { title: "NVR设备管理", icon: "el-icon-wallet" },
        children: [
          {
            path: "Batch",
            component: resolve => require(["@/views/deviceManagement/Nvrs/Batch"], resolve),
            name: "Nvrs-Batch",
            meta: { title: "批量注册", icon: "el-icon-position" }
          },
          {
            path: "Maintain",
            component: resolve => require(["@/views/deviceManagement/Nvrs/Maintain"], resolve),
            name: "Nvrs-Maintain",
            meta: { title: "NVR设备维护", icon: "el-icon-position" }
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
    name: "Customer",
    meta: { title: "客户管理", icon: "el-icon-user" },
    children: [
      {
        path: "register",
        component: resolve => require(["@/views/customerManagement/register"], resolve),
        name: "Customer-Register",
        meta: { title: "客户注册" }
      },
      {
        path: "maintain",
        component: resolve => require(["@/views/customerManagement/maintain"], resolve),
        name: "Customer-Maintain",
        meta: { title: "客户信息维护" }
      },
      {
        path: "area",
        component: resolve => require(["@/views/customerManagement/area"], resolve),
        name: "Area",
        meta: { title: "客户厨房区域信息" }
      },
      {
        path: "device",
        component: resolve => require(["@/views/customerManagement/device"], resolve),
        name: "Customer-Device",
        meta: { title: "客户设备信息" }
      }
    ]
  },
  {
    path: "/order",
    component: Layout,
    hidden: true,
    redirect: "false",
    name: "Order",
    meta: { title: "订单管理", icon: "el-icon-shopping-bag-1" },
    children: [
      {
        path: "monitor",
        component: resolve => require(["@/views/orderManagement/monitor"], resolve),
        name: "Monitor",
        meta: { title: "工单监控" }
      },
      {
        path: "sale",
        component: resolve => require(["@/views/orderManagement/sale"], resolve),
        name: "Sale",
        meta: { title: "销售订单" }
      },
      {
        path: "distribution",
        component: resolve => require(["@/views/orderManagement/distribution"], resolve),
        name: "Distribution",
        meta: { title: "配货订单" }
      },
      {
        path: "construction",
        component: resolve => require(["@/views/orderManagement/construction"], resolve),
        name: "Construction",
        meta: { title: "施工工单" }
      },
      {
        path: "maintenance",
        component: resolve => require(["@/views/orderManagement/maintenance"], resolve),
        name: "Maintenance",
        meta: { title: "维保工单" }
      },
      {
        path: "repair",
        component: resolve => require(["@/views/orderManagement/repair"], resolve),
        name: "Repair",
        meta: { title: "维修订单" }
      }
    ]
  }
]

const router = new VueRouter({
  mode: "hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})

export default router
