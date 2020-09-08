import request from "@/utils/request"

export const getRegist = data => {
  return request({
    url: "api/Customers/Regist",
    method: "post",
    data
  })
}
