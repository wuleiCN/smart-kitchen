import request from "@/utils/request"

export const getList = () => {
  return request({
    url: "api/Customers/List",
    method: "get"
  })
}

// export const getCustomerById = id => {
//   return request({
//     url: `api/Customers/GetCustomer?id=${id}`,
//     method: "get"
//   })
// }

