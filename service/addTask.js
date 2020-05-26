import request from "/post";

let app = getApp();

export function addTask(e, priority) {

  return request({
    url: 'https://www.caodalinsworld.com:8081/applet/task/add.do',
    data: {
      userId: app.globalData.userId,
      type: 0,
      day: app.globalData.date,
      name: e.detail.value.task_name,
      description: e.detail.value.description,
      priority: priority
    }
  })
}