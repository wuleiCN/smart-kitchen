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
