import request from "@/utils/request"

// 获取报警型号分页列表
export const getAlarmDeviceList = data => {
  return request({
    url: "api/Alarms/GetAlarmsWithPage",
    method: "get",
    params: data
  })
}
// 获得指定查询条件的报警设备信息（分页）
export const getAlarmByQuery = data => {
  return request({
    url: "api/Alarms/GetAlarmsByQueryWithPage",
    method: "get",
    params: data
  })
}
// 注册报警设备
export const registerAlarm = data => {
  return request({
    url: "api/Alarms/Regist",
    method: "post",
    data
  })
}
// 批量注册报警设备
export const registerAlarmDevice = data => {
  return request({
    url: "api/Alarms/BatchRegist",
    method: "post",
    data
  })
}
// 更新报警设备
export const updataAlarmDevice = data => {
  return request({
    url: "api/Alarms/Update",
    method: "post",
    data
  })
}
// 删除报警设备
export const deleteAlarmDevice = id => {
  return request({
    url: "api/Alarms/Delete",
    method: "post",
    id
  })
}
// 下载报警设备批量注册模板文件
export const getBatchTemplate = () => {
  return request({
    url: "api/Alarms/GetBatchRegistTemplate",
    method: "get"
  })
}
