import request from "@/utils/request"

// 获取灭火设备信息列表
export const getFiresByQuery = data => {
  return request({
    url: "api/Alarms/GetAlarmsByQueryWithPage",
    method: "get",
    params: data
  })
}
// 更新灭火设备型号信息
export const updateFireModel = data => {
  return request({
    url: "api/DeviceModels/UpdateFireModel",
    method: "post",
    data
  })
}
