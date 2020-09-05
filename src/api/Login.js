import request from "@/utils/request"

export const login = data => {
  return request({
    url: "api/Account/Login",
    method: "get",
    data
  })
}
