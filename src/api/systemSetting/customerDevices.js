import request from "@/utils/request"

// 获取报警型号列表
export const getAlarmList = () => {
  return request({
    url: "api/DeviceModels/GetAlarmModels",
    method: "get"
  })
}
// 更新报警设备
export const updataAlarm = data => {
  return request({
    url: "api/DeviceModels/UpdateAlarmModel",
    method: "post",
    data
  })
}
// 新增报警设备
export const addAlarm = data => {
  return request({
    url: "api/DeviceModels/CreateAlarmModel",
    method: "post",
    data
  })
}
// 删除报警设备
export const deleteAlarm = id => {
  return request({
    url: "api/DeviceModes/DeleteAlarmModel",
    method: "post",
    id
  })
}
// 获取灭火设备型号列表
export const getFireList = () => {
  return request({
    url: "api/DeviceModels/GetFireModels",
    method: "get"
  })
}
// 更新灭火设备型号
export const updataFire = data => {
  return request({
    url: "api/DeviceModels/UpdateFireModel",
    method: "post",
    data
  })
}
// 新建灭火设备型号
export const addFire = data => {
  return request({
    url: "api/DeviceModels/CreateFireModel",
    method: "post",
    data
  })
}
// 删除灭火设备型号
export const deleteFire = id => {
  return request({
    url: "api/DeviceModels/DeleteFireModel",
    method: "post",
    id
  })
}
