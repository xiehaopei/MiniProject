import {
  login
} from '../../service/login'

let app = getApp();

Page({
  data: {
    currentTab: 0,
    items: [{
        "iconPath": "/assets/tab_control/home.png",
        "selectedIconPath": "/assets/tab_control/home_active.png",
        "text": "首页"
      },
      {
        "iconPath": "/assets/tab_control/track.png",
        "selectedIconPath": "/assets/tab_control/track_active.png",
        "text": "足迹"
      },
    ],
    hidden: false
  },
  //页面切换
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //添加任务按钮事件监听
  addTask(e) {
    console.log("按钮点击");
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              login();
              //已授权进行下一步操作
            }
          });
        } else {
          // 用户没有授权，显示授权弹窗
          /*that.btnClick = that.selectComponent('#authorize');
          that.btnClick.showModal();*/
        }
      }
    });
  },
  /*//监听数据变化
  onSyncAttrUpdate(e) {
    console.log('-----------', e.detail)
    this.setData({
      hidden: e.detail
    })
  },*/
  //用户按了允许授权按钮
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,隐藏授权弹窗
      /*this.triggerEvent('callHidden');*/
    }
  },
  //用户按了拒绝授权按钮
  refuse() {
    /*this.triggerEvent('callHidden');*/
    wx.showModal({
      title: '警告',
      content: '您拒绝了授权，将无法进入小程序，请授权之后再进入!',
      showCancel: false,
      confirmText: '返回',
      success: function (res) {
        // 用户没有授权成功,将弹窗隐藏
        if (res.confirm) {
          console.log('用户点击了“拒绝”');
        }
      }
    })
  },
  onLoad: function () {
    let that = this;
    /*app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })*/
  }
})