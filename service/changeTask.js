import request from "/post";

let app = getApp();

export function changeTask(detail, type) {
  return request({
    url: "https://www.caodalinsworld.com:8081/applet/task/update",
    data: {
      id: detail.id,
      name: detail.name,
      description: detail.description,
      priority: detail.priority,
      day: detail.day,
      type: type,
      userId: app.globalData.userId,
    },
  })
}