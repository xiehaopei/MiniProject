//Component Object
import request from "../../service/post";
let app = getApp();

Component({
  properties: {

  },
  data: {
    getFocus: false,
    more: true,
    priority: [
      "无",
      "重要且紧急",
      "重要但不紧急",
      "紧急但不重要",
      "不紧急且不重要",
    ],
    priorityIndex: 0,
    items: [{
        name: 'yes',
        value: '是'
      },
      {
        name: 'no',
        value: '否',
        checked: 'true'
      }
    ],
    animationBtn: {}, //按钮动画
    animationSet: {}, //更多设置动画
  },
  methods: {
    //展示更多任务设置
    showMore() {
      this.translateBtn()
      this.translateSet()
      this.triggerEvent('moveUp', "")
      setTimeout(() => {
        this.setData({
          more: !this.data.more
        })
      }, 600);
    },
    //监听单选框变化
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    //监听优先度选择
    changePriority(e) {
      console.log(e);
      this.setData({
        priorityIndex: e.detail.value,
      });
      if (e.detail.value == 0) {
        this.setData({
          itemColor: "#2c2c2c",
        });
      }
      if (e.detail.value == 1) {
        this.setData({
          itemColor: "#d81e06",
        });
      }
      if (e.detail.value == 2) {
        this.setData({
          itemColor: "#f4ea2a",
        });
      }
      if (e.detail.value == 3) {
        this.setData({
          itemColor: "#1296db",
        });
      }
      if (e.detail.value == 4) {
        this.setData({
          itemColor: "#1afa29",
        });
      }
    },
    //表单提交事件
    formSubmit: function (e) {
      console.log(e);
      if (e.detail.value.task_name === '') {
        console.log('未填写任务名称');
      } else {
        request({
          url: 'https://www.caodalinsworld.com:8081/applet/task/add.do',
          methods: "POST",
          header: {
            'content-type': 'application/json'
          },
          data: {
            openid: app.globalData.openid,
            type: 0,
            day: app.globalData.date,
            name: e.detail.value.task_name,
            description: e.detail.value.description,
            priority: e.detail.value.priority
          }
        }).then(res => {
          this.triggerEvent('callHidden', '');
          wx.showToast({
            title: '创建成功',
            icon: 'none',
            image: '',
            duration: 600,
            mask: true,
            success: (result) => {
              console.log('任务创建成功');
            }
          });
        }).catch(err => {
          console.log(err);
        })
      }
    },
    //表单重置事件
    formReset: function (e) {

    },
    translateBtn: function () {
      this.animationMove.translateX(100).step()
      this.setData({
        animationBtn: this.animationMove.export()
      })
    },
    translateSet: function () {
      this.animationLeft.translateX(-100).step()
      this.setData({
        animationSet: this.animationLeft.export()
      })
    },
  },
  created: function () {
    var that = this
    this.animationMove = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
    this.animationLeft = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })
  },
  attached: function () {

  },
  ready: function () {

  },
  moved: function () {

  },
  detached: function () {

  },
});