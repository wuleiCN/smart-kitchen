import request from "@/utils/request"

export const getCustomers = customer => {
  return request({
    url: "api/Customers/GetAreas",
    method: "get",
    params: {
      customer
    }
  })
}
