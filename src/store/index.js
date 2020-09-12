import Vue from "vue"
import Vuex from "vuex"
import { getUser } from "@/api/Login"
import { getSession } from "@/utils/auth.js"
import { routerMap } from "@/router/routers.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getSession("USER_INFO"),
    // routers: getSession("ROUTES_KEY"),
    routers: [],
    originRouters: [],
    loadMenus: false
  },
  mutations: {
    getUserInfo(state, route) {
      state.userInfo = route
    },
    getRoutes(state, data) {
      state.originRouters = routerMap
      state.routers = state.originRouters.concat(data)
      // setSession("ROUTES_KEY", data)
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },
  actions: {
    getRoutesSync({ commit }, position) {
      // const data = await getMenus()
      // if (data.status === 200) commit("getRoutes", data.data.data)
      commit("getRoutes", position)
      // console.log(data);
    },
    updateLoadMenus({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("SET_LOAD_MENUS", data)
      })
    },
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUser().then(data => {
          commit("getUserInfo", data.data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
