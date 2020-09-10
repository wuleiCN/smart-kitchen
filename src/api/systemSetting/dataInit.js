import request from "@/utils/request"
import Cookies from "js-cookie";

// 获取报警信息列表
export const dataInit = data => {
  return request({
    url: "api/Messages/List",
    method: "get",
    params: {
      token: Cookies.get("TOKEN_KEY")
    }
  })
}
// 获取报警数量列表
export const msgCount = () => {
  return request({
    url: "api/Messages/Count",
    method: "get"
  })
}

