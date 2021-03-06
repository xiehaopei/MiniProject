//Component Object;
import { addTask } from '../../service/addTask';
let app = getApp();

Component({
  properties: {},
  data: {
    getFocus: false,
    more: true,
    priority: ['无', '重要且紧急', '重要但不紧急', '紧急但不重要', '不紧急且不重要'],
    priorityIndex: 0,
    items: [
      {
        name: 'yes',
        value: '是',
      },
      {
        name: 'no',
        value: '否',
        checked: 'true',
      },
    ],
    animationBtn: {}, //按钮动画
    animationSet: {}, //更多设置动画
  },
  methods: {
    //展示更多任务设置
    showMore() {
      this.translateBtn();
      this.translateSet();
      this.triggerEvent('moveUp', '');
      setTimeout(() => {
        this.setData({
          more: !this.data.more,
        });
      }, 600);
    },
    //监听单选框变化
    radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);
    },
    //监听优先度选择
    changePriority(e) {
      console.log(e);
      this.setData({
        priorityIndex: e.detail.value,
      });
      if (e.detail.value == 0) {
        this.setData({
          itemColor: '#2c2c2c',
        });
      }
      if (e.detail.value == 1) {
        this.setData({
          itemColor: '#d81e06',
        });
      }
      if (e.detail.value == 2) {
        this.setData({
          itemColor: '#f4ea2a',
        });
      }
      if (e.detail.value == 3) {
        this.setData({
          itemColor: '#1296db',
        });
      }
      if (e.detail.value == 4) {
        this.setData({
          itemColor: '#1afa29',
        });
      }
    },
    //表单提交事件
    formSubmit: function (e) {
      console.log(e);
      let priority = e.detail.value.priority;
      if (priority === undefined) {
        priority = 0;
      }
      if (e.detail.value.task_name === '') {
        console.log('未填写任务名称');
        wx.showToast({
          title: '请填写任务名称',
          icon: 'none',
          image: '',
          duration: 400,
          mask: true,
        });
      } else {
        addTask(e, priority)
          .then(res => {
            //将加入的任务添加到全局的task中
            app.globalData._task.push({
              day: app.globalData.date,
              id: res.data.data.id,
              name: e.detail.value.task_name,
              userId: app.globalData.userId,
              priority: priority,
              type: 0,
            });
            //push无法做到动态刷新，以此方法触发get方法来代替
            app.globalData.task = app.globalData.task;
            this.triggerEvent('callHidden', '');
            wx.showToast({
              title: '创建成功',
              icon: 'none',
              image: '',
              duration: 600,
              mask: true,
              success: result => {
                console.log('任务创建成功');
              },
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
      app.globalData.unfinish_sum = app.globalData.unfinish_sum + 1;
    },
    //取消添加
    cancelAdd() {
      this.triggerEvent('callHidden', '');
    },
    translateBtn: function () {
      this.animationMove.translateX(100).step();
      this.setData({
        animationBtn: this.animationMove.export(),
      });
    },
    translateSet: function () {
      this.animationLeft.translateX(-100).step();
      this.setData({
        animationSet: this.animationLeft.export(),
      });
    },
  },
  created: function () {
    var that = this;
    this.animationMove = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    });
    this.animationLeft = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    });
  },
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
