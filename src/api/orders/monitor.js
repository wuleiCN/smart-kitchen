import request from "@/utils/request"

// 获得工单监控清单
export const getMonitorList = () => {
  return request({
    url: "api/Order/GetMonitorList",
    method: "get"
  })
}
