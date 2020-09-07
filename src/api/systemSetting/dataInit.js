import request from "@/utils/request"
import Cookies from "js-cookie";

export const dataInit = data => {
  return request({
    url: "api/Messages/List",
    method: "get",
    params: {
      token: Cookies.get("TOKEN_KEY")
    }
  })
}
export const msgCount = () => {
  return request({
    url: "api/Messages/Count",
    method: "get"
  })
}

