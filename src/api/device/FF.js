import request from "@/utils/request"

// 获取灭火设备信息列表
export const getFireList = () => {
  return request({
    url: "api/DeviceModels/GetFireModels",
    method: "get"
  })
}
