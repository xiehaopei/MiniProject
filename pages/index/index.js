import {
  login
} from "../../service/login";

let app = getApp();


Page({
  data: {
    currentTab: 0,
    items: [{
        iconPath: "/assets/tab_control/home.png",
        selectedIconPath: "/assets/tab_control/home_active.png",
        text: "首页",
      },
      {
        iconPath: "/assets/tab_control/track.png",
        selectedIconPath: "/assets/tab_control/track_active.png",
        text: "足迹",
      },
    ],
    hidden: false,
  },
  //页面切换
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      });
    }
  },
  //添加任务按钮事件监听
  addTask(e) {
    let that = this;
    console.log("按钮点击");
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          console.log("1111111111111");
          that.btnClick = that.selectComponent('#addTask');
          that.btnClick.showModal();
        }
      },
    })
  },
  //用户按了授权按钮
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      /*在此发送请求将用户数据发送到数据库中
        wx.request({
          url: app.globalData.urlPath + 'user/add',
          data: {
            openid: getApp().globalData.openid,
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            province: e.detail.userInfo.province,
            city: e.detail.userInfo.city
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //从数据库获取用户信息
            that.queryUsreInfo();
            console.log("插入小程序登录用户信息成功！");
          }
        });
        //login();
      */
      this.addTask();
    } else {
      //用户按了拒绝授权按钮
      wx.showModal({
        title: "提示",
        content: "您拒绝了授权!",
        showCancel: false,
        confirmText: "返回",
        success: function (res) {
          // 用户没有授权成功,将弹窗隐藏
          if (res.confirm) {
            console.log("用户点击了“拒绝”");
          }
        },
      });
    }
  },
  /*获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: app.globalData.urlPath + 'user/userInfo',
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        getApp().globalData.userInfo = res.data;
      }
    })
  },*/
  //监听隐藏任务添加窗口参数变化
  onSyncAttrUpdate(e) {
    console.log('-----------', e.detail)
    this.setData({
      hidden: e.detail
    })
  },
  onLoad: function () {
    let that = this;
    /*app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })*/
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting["scope.userInfo"]) {
          console.log("===========");
          wx.getUserInfo({
            success: function (res) {
              login();
              //已授权进行下一步操作
            },
          });
        } else {
          // 用户没有授权，显示授权弹窗

        }
      },
    })
  },
  onShareAppMessage: function () {
    return {
      title: '我的小程序',
      path: '/pages/index/index',
      imageUrl: '显示的图片，默认为当前页面的截图',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        wx.showToast({
          title: '分享成功',
          icon: 'none'
        })
      },
      fail: function (res) {
        console.log(res + '失败');
      }
    }
  }
});