import request from "@/utils/request"

// 获得指定单位摄像机信息
export const getCamerasByCompany = data => {
  return request({
    url: "api/Cameras/GetByCompany",
    method: "get",
    params: data
  })
}
// 高级查询（分页）
export const getByCurrentCustomerWithPage = data => {
  return request({
    url: "api/Cameras/GetByCurrentCustomerWithPage",
    method: "get",
    params: data
  })
}
// 注册摄像机
export const CamerasRegist = data => {
  return request({
    url: "api/Cameras/Regist",
    method: "post",
    data
  })
}
// 修改摄像机设备信息
export const CamerasUpdate = data => {
  return request({
    url: "api/Cameras/Update",
    method: "post",
    data
  })
}
// 删除摄像机信息
export const CamerasDelete = data => {
  return request({
    url: "api/Cameras/Delete",
    method: "post",
    data
  })
}
// 注销摄像机信息
export const CamerasDestroy = data => {
  return request({
    url: "api/Cameras/Destroy",
    method: "post",
    data
  })
}
