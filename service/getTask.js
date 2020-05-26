import request from "/post";

let app = getApp();

export function getTask(type) {
  return request({
    url: "https://www.caodalinsworld.com:8081/applet/task/get.do",
    data: {
      day: app.globalData.date,
      type: type
    },
  })
}