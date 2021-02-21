import request from "@/utils/request"

// 获得指定单位Nvr信息
export const getNvrsByCompany = data => {
  return request({
    url: "api/Nvrs/GetByCompany",
    method: "get",
    params: data
  })
}
// 高级查询（分页）
export const getByAdvanceWithPage = data => {
  return request({
    url: "api/Nvrs/GetByAdvanceWithPage",
    method: "get",
    params: data
  })
}
// 注册Nvr
export const NvrsRegist = data => {
  return request({
    url: "api/Nvrs/Regist",
    method: "post",
    data
  })
}
// 修改Nvr设备信息
export const NvrsUpdate = data => {
  return request({
    url: "api/Nvrs/Update",
    method: "post",
    data
  })
}
// 删除Nvr信息
export const NrvsDelete = data => {
  return request({
    url: "api/Nvrs/Delete",
    method: "post",
    data
  })
}
// 注销Nvr信息
export const NrvsDestroy = data => {
  return request({
    url: "api/Nrvs/Destroy",
    method: "post",
    data
  })
}
