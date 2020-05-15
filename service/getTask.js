import request from "/post";

let app = getApp();

export function getTask(type) {
  return request({
    url: "https://www.caodalinsworld.com:8081/applet/task/get.do",
    methods: "POST",
    header: {
      "Content-Type": "application/json",
    },
    data: {
      openid: app.globalData.openid,
      day: app.globalData.date,
      type: type
    },
  })
}