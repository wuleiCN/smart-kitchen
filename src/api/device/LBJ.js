import request from "@/utils/request"

// 获取报警信息列表
export const getAlarmList = () => {
  return request({
    url: "api/DeviceModels/GetAlarmModels",
    method: "get"
  })
}

