import request from "/post";

let app = getApp();

export function deleteTask(id) {
  return request({
    url: "https://www.caodalinsworld.com:8081/applet/task/delete",
    data: {
      id: id
    },
  })
}