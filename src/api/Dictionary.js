import request from "@/utils/request"

// 获取设备类别
export const getDeviceType = data => {
  return request({
    url: "api/Dictionary/DeviceType",
    method: "get",
    params: data
  })
}
// 获取设备状态
export const getDeviceStatus = data => {
  return request({
    url: "api/Dictionary/DeviceStatus",
    method: "get",
    params: data
  })
}
// 获取摄像机/NVR品牌
export const getCameraBrand = data => {
  return request({
    url: "api/Dictionary/CameraBrand",
    method: "get",
    params: data
  })
}
// 获取公司类别
export const getCompanyType = data => {
  return request({
    url: "api/Dictionary/CompanyType",
    method: "get",
    params: data
  })
}
// 获取公司状态
export const getCompanyStatus = data => {
  return request({
    url: "api/Dictionary/CompanyStatus",
    method: "get",
    params: data
  })
}
// 获取客户状态
export const getCustomerStatus = data => {
  return request({
    url: "api/Dictionary/CustomerStatus",
    method: "get",
    params: data
  })
}
// 获取员工类别
export const getEmployeeType = data => {
  return request({
    url: "api/Dictionary/EmployeeType",
    method: "get",
    params: data
  })
}
// 获取员工状态
export const getEmployeeStatus = data => {
  return request({
    url: "api/Dictionary/EmployeeStatus",
    method: "get",
    params: data
  })
}
// 获取工单类别
export const getOrderType = data => {
  return request({
    url: "api/Dictionary/OrderType",
    method: "get",
    params: data
  })
}
// 获取工单状态
export const getOrderStatus = data => {
  return request({
    url: "api/Dictionary/OrderStatus",
    method: "get",
    params: data
  })
}
// 获得所有设备型号列表
export const getDeviceModels = data => {
  return request({
    url: "api/DeviceModels/List",
    method: "get",
    params: data
  })
}
