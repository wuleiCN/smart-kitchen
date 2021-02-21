import request from "@/utils/request"

export const getList = data => {
  return request({
    url: "api/Companies/List",
    method: "get",
    params: data
  })
}
