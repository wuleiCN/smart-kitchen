import request from "@/utils/request"

export const Register = data => {
  return request({
    url: "api/Companies/Regist",
    method: "post",
    data
  })
}
