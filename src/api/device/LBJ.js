import request from "@/utils/request"

// 获取报警信息列表
export const getAlarmList = () => {
  return request({
    url: "api/DeviceModels/GetAlarmModels",
    method: "get"
  })
}
// 下载报警设备批量注册模板文件
export const getBatchTemplate = () => {
  return request({
    url: "api/Alarms/GetBatchRegistTemplate",
    method: "get"
  })
}
