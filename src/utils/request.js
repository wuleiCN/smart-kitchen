import axios from "axios"
import { Notification } from "element-ui"
import { addPendingRequest, removePendingRequest } from "../utils/cancelToken"
// import { getToken } from "@/utils/auth"
import Cookies from "js-cookie"
const service = axios.create({
  baseURL: "/",
  timeout: 36000 // 请求超时时间
})
service.interceptors.request.use(
  config => {
    if (Cookies.get("TOKEN_KEY")) {
      config.headers["Token"] = Cookies.get("TOKEN_KEY") // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers["Content-Type"] = "application/json"
    removePendingRequest(config);
    addPendingRequest(config);
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
  console.log("res intercepoter:  ", res)
  removePendingRequest(res.config)
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
