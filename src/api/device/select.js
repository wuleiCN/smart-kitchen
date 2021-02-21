import request from "@/utils/request";

// 获得指定查询条件设备信息
export const getDeviceList = data => {
  return request({
    url: "api/Devices/GetDataWithPage",
    method: "get",
    params: data
  });
};
// 获取设备型号信息
export const getDeviceModels = data => {
  return request({
    url: "api/DeviceModels/List",
    method: "get",
    params: data
  });
};
// 获得当前客户区域信息
export const GetAreas = data => {
  return request({
    url: "api/Customers/GetAreas",
    method: "get",
    params: data
  });
};
