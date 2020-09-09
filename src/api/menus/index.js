import request from "@/utils/request"

export const getMenus = () => {
  return request({
    url: "api/Menus/List",
    method: "get"
  })
}
