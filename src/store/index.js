import Vue from "vue"
import Vuex from "vuex"
import { getMenus } from "@/api/menus"
import { getSession, setSession } from "@/utils/auth.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    routes: getSession("ROUTES_KEY")
  },
  mutations: {
    getUserInfo(state, route) {
      state.userInfo = route
    },
    getRoutes(state, data) {
      state.routes = data
      setSession("ROUTES_KEY", data)
    }
  },
  actions: {
    async getRoutesSync({ commit }) {
      const data = await getMenus()
      if (data.status === 200) commit("getRoutes", { route: data.data })
      console.log(data);
    }
  },
  modules: {
  }
})
