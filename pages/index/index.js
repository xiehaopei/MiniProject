import login from '../../service/login';
import addUserInfo from '../../service/addUserInfo';
import { getTask } from '../../service/getTask.js';

let app = getApp();

Page({
  data: {
    currentTab: 0,
    items: [
      {
        iconPath: '/assets/tab_control/home.svg',
        selectedIconPath: '/assets/tab_control/home_active.svg',
        text: '首页',
      },
      {
        iconPath: '/assets/tab_control/data.svg',
        selectedIconPath: '/assets/tab_control/data_active.svg',
        text: '数据',
      },
    ],
    hidden: false,
    disBtn: false,
    goTop: false,
    indexShow: true,
    tabIndex: 1001,
    topIndex: 1,
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
    console.log('按钮点击');
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.setData({
            hidden: true,
          });
          that.btnClick = that.selectComponent('#addTask');
          that.btnClick.showModal();
        }
      },
    });
  },
  //用户按了授权按钮
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log('用户的信息如下：');
      console.log(e.detail.userInfo);
      //发出请求将用户数据存储进数据库
      addUserInfo(e.detail.userInfo, app.globalData.openid);
      //使添加任务页面显现
      this.addTask();
      //设置授权按钮不可用
      this.setData({
        disBtn: true,
      });
    } else {
      //用户按了拒绝授权按钮
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权!',
        showCancel: false,
        confirmText: '返回',
        success: function (res) {
          // 用户没有授权成功,将弹窗隐藏
          if (res.confirm) {
            console.log('用户点击了“拒绝”');
          }
        },
      });
    }
  },
  //监听隐藏任务添加窗口参数变化
  onSyncAttrUpdate(e) {
    console.log('-----------', e.detail);
    this.setData({
      hidden: e.detail,
    });
    if (this.data.hidden) {
      this.setData({
        indexShow: false,
        topIndex: 0,
      });
    } else {
      this.setData({
        indexShow: true,
        topIndex: 1,
      });
    }
  },
  //监听页面滚动
  onPageScroll(e) {
    //参数e会返回滚动条滚动的高度
    if (e.scrollTop > 150) {
      if (!this.data.goTop) {
        this.setData({
          goTop: true,
        });
      }
    } else {
      if (this.data.goTop) {
        this.setData({
          goTop: false,
        });
      }
    }
  },
  //获取时间并存为全局变量
  getDate() {
    let date = new Date();
    let year = date.getFullYear(),
      month = (date.getMonth() + 1 + '').padStart(2, '0'),
      day = (date.getDate() + '').padStart(2, '0');
    let dateStr = [year, month, day].join('-');
    app.globalData.date = dateStr;
    wx.setStorage({
      key: 'date',
      data: dateStr,
    });
  },
  async onLoad() {
    let that = this;
    //获取时间
    this.getDate();
    //登录并获取任务列表
    await login.catch(err => err);
    const { data: res1 } = await getTask(0).catch(err => err);
    console.log(res1);
    if (res1.data.list) {
      app.globalData.task = res1.data.list;
      app.globalData.unfinish_sum = res1.data.total;
    } else {
      app.globalData.task = [];
      app.globalData.unfinish_sum = 0;
    }
    console.log('更新未完成任务列表');
    const { data: res2 } = await getTask(1).catch(err => err);
    console.log(res2);
    if (res2.data.list) {
      app.globalData.finish_task = res2.data.list;
      app.globalData.finish_sum = res2.data.total;
    } else {
      app.globalData.finish_task = [];
      app.globalData.finish_sum = 0;
    }
    console.log('更新已完成任务列表');

    // 查看是否授权,已授权则设置授权按钮无效
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                disBtn: true,
              });
            },
          });
        }
      },
    });
  },
  //分享设置
  onShareAppMessage: function () {
    return {
      title: '简A笔记',
      path: '/assets/icon/简A笔记.png',
      imageUrl: '显示的图片，默认为当前页面的截图',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        wx.showToast({
          title: '分享成功',
          icon: 'none',
        });
      },
      fail: function (res) {
        console.log(res + '失败');
      },
    };
  },
});
