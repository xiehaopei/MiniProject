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
        methods: "POST",
        header: {
          'content-type': 'application/json'
        },
        data: {
          code: res.code
        }
      }).then(res => {
        console.log(res)
        // 获取到用户的 openid
        console.log("获取到用户的openid");
        let app = getApp();
        app.globalData.openid = res.data.data.openid;
        wx.setStorage({
          key: 'openid',
          data: res.data.data.openid
        })

        resolve()
      }).catch(err => {
        console.log(err);
      })
    }
  })
})