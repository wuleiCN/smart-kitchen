import request from "@/utils/request"

export const login = data => {
  return request({
    url: `api/Account/Login?username=${data.username}&password=${data.password}`,
    method: "get"
  })
}
export const getUser = () => {
  return request({
    url: "api/Users/GetLoginUserInfo",
    method: "get"
  })
}

