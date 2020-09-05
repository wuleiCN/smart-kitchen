import axios from "axios"
import Vue from "vue"
import { Notification } from "element-ui"
import { getToken } from "@/utils/auth"
const service = axios.create({
  baseURL: "/",
  timeout: 36000 // 请求超时时间
})
service.interceptors.request.use(
  config => {
    Vue.__shop_scope.loading()
    if (getToken()) {
      config.headers["Authorization"] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers["Content-Type"] = "application/json"
    return config
  },
  error => {
    // Do something with request error
    Notification.error({
      title: error,
      duration: 5000
    })
    console.log(error) // for debug
    Promise.reject(error)
  }
)
axios.interceptors.response.use(res => {
  // console.log('res intercepoter:  ', res)
  Vue.__shop_scope.unloading()
  if (![200, 201].includes(res.data.meta.status)) {
    Notification.error({
      title: "网络请求超时",
      duration: 5000
    })
    throw new Error(res.data.meta.msg)
  }

  return res
})
export default service
