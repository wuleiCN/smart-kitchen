import request from "@/utils/request"

// 获取灭火设备信息列表
export const getFiresByQuery = data => {
  return request({
    url: "api/Alarms/GetAlarmsByQueryWithPage",
    method: "get",
    data
  })
}
