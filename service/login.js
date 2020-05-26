import request from "/post";

export default new Promise((resolve, reject) => {
  // 若用户已经授权过,调用微信的 wx.login 接口，从而获取code,再执行下步操作
  wx.login({
    success: res => {
      // 获取到用户的 code 之后：res.code
      console.log("获取到用户的code");
      // 传给后台，再经过解析获取用户的 openid：
      //发送请求
      request({
        url: 'https://www.caodalinsworld.com:8081/applet/user/getState',
        data: {
          code: res.code
        }
      }).then(res => {
        console.log(res)
        // 获取到用户的 id
        console.log("获取到userId");
        let app = getApp();
        app.globalData.userId = res.data.data.id;
        wx.setStorage({
          key: 'userId',
          data: res.data.data.id
        })
        resolve()
      }).catch(err => {
        console.log(err);
      })
    }
  })
})