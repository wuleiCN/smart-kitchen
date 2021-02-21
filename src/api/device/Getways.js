import request from "@/utils/request"

// 获得指定单位智能网关信息（分页）
export const getByCompanyWithPage = data => {
  return request({
    url: "api/Getways/GetByCompanyWithPage",
    method: "get",
    params: data
  })
}
// 高级查询（分页）
export const getByAdvanceWithPage = data => {
  return request({
    url: "api/Gateways/GetByAdvanceWithPage",
    method: "get",
    params: data
  })
}
// 注册智能网关
export const GatewaysRegist = data => {
  return request({
    url: "api/Gateways/Regist",
    method: "post",
    data
  })
}
// 修改智能网关设备信息
export const GatewaysUpdate = data => {
  return request({
    url: "api/Gateways/Update",
    method: "post",
    data
  })
}
// 删除智能网关信息
export const GatewaysDelete = data => {
  return request({
    url: "api/Gateways/Delete",
    method: "post",
    data
  })
}
// 注销智能网关信息
export const GatewaysDestroy = data => {
  return request({
    url: "api/Gateways/Destroy",
    method: "post",
    data
  })
}
