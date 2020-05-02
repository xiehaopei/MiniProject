export function login() {
  // 若用户已经授权过,调用微信的 wx.login 接口，从而获取code,再执行下步操作
  wx.login({
    success: res => {
      // 获取到用户的 code 之后：res.code
      console.log("用户的code:" + res.code);
      // 可以传给后台，再经过解析获取用户的 openid
      // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
      wx.request({
        //     // 自行补上自己的 APPID 和 SECRET
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx31f2ca9975ff2446&secret=6531e69493a4253bdbf4c6bd73396ca8&js_code=' + res.code + '&grant_type=authorization_code',
        /*
        //发送请求
        wx.request({
          url: '自己的域名', 
          data: {
            code: res.code
          },
          header: {
            'content-type': 'application/json' 
          },
          success(res) {
            console.log(res)
          }
        })
        */ 
        success: res => {
          // 获取到用户的 openid
          console.log("用户的openid:" + res.data.openid);
          let app = getApp();
          app.globalData.openid = res.data.openid;
          wx.setStorage({
            key: 'openid',
            data: res.data.openid
          })
        }
      });
    }
  })
}