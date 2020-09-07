import Mock from "@/api/mock.js"
Mock.mock("/mock/Customers/List", "get", {
  "code": 2000,
  "message": "成功",
  "policeCode|1": '@string("number", 7)',
  "username|1": "@cname"
})
