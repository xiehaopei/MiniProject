import { changeTask } from '../../service/changeTask';
import { getTask } from '../../service/getTask';
import { deleteTask } from '../../service/deleteTask';

let app = getApp();

//Component Object
Component({
  properties: {
    taskList: {
      type: Array,
      value: [],
      observer: function () {},
    },
    title: {
      type: String,
      value: '',
    },
    indexShow: {
      type: Boolean,
      value: true,
      observer: function (newVal, oldVal) {
        if (newVal) {
          this.setData({
            viewIndex: 1,
            btnIndex: 0,
          });
        } else {
          this.setData({
            viewIndex: 0,
            btnIndex: -1,
          });
        }
      },
    },
  },
  data: {
    //任务列表隐藏
    isTaskListHidden: false,
    //顶部文字栏
    showStatu: '收起',
    //index设置
    viewIndex: 1,
    btnIndex: 0,
    //上一个拉开拓展栏的index
    openIndex: 0,
  },
  methods: {
    //获取到来自组件的监听图标改变事件
    async changeType(e) {
      wx.showLoading({
        title: '加载中...',
      });
      //true切换为完成，false切换为未完成
      if (e.detail === true) {
        await changeTask(e.currentTarget.dataset.item, 1);
        //重新发出请求
        const { data: res } = await getTask(1);
        if (res.data.list) {
          app.globalData.finish_task = res.data.list;
          app.globalData.finish_sum = res.data.total;
          app.globalData.unfinish_sum = app.globalData.unfinish_sum - 1;
        } else {
          app.globalData.finish_task = [];
          app.globalData.finish_sum = 0;
        }
        let index = app.globalData.task.findIndex(
          item => item.id === e.currentTarget.dataset.item.id
        );
        if (index >= 0) {
          app.globalData.task.splice(index, 1);
          app.globalData.task = app.globalData.task;
        } else {
          console.log('发生错误');
        }
      } else {
        await changeTask(e.currentTarget.dataset.item, 0);
        //重新发出请求
        const { data: res } = await getTask(0);
        if (res.data.list) {
          app.globalData.task = res.data.list;
          app.globalData.unfinish_sum = res.data.total;
          app.globalData.finish_sum = app.globalData.finish_sum - 1;
        } else {
          app.globalData.task = [];
          app.globalData.unfinish_sum = 0;
        }
        let index = app.globalData.finish_task.findIndex(
          item => item.id === e.currentTarget.dataset.item.id
        );
        if (index >= 0) {
          app.globalData.finish_task.splice(index, 1);
          app.globalData.finish_task = app.globalData.finish_task;
        } else {
          console.log('发生错误');
        }
      }
      wx.hideLoading();
    },
    //隐藏/展示任务列表
    taskListHidden() {
      if (this.data.showStatu === '收起')
        this.setData({
          isTaskListHidden: !this.data.isTaskListHidden,
          showStatu: '展开',
        });
      else if (this.data.showStatu === '展开')
        this.setData({
          isTaskListHidden: !this.data.isTaskListHidden,
          showStatu: '收起',
        });
    },
    //跳转到任务详情页
    showTaskDetail(e) {
      let item = JSON.stringify(e.currentTarget.dataset.item);
      wx.navigateTo({
        url: '/pages/taskDetail/taskDetail?item=' + item,
        success: res => {},
        fail: err => console.log(err, '跳转发生错误'),
      });
    },

    // 显示删除按钮
    showDeleteButton: function (e) {
      let index = e.currentTarget.dataset.index;

      //设置只能拉开一个删除栏
      if (this.data.openIndex !== index) {
        this.setXmove(this.data.openIndex, 0);
      }
      this.data.openIndex = index;

      this.setXmove(index, -130);
    },

    // 隐藏删除按钮
    hideDeleteButton: function (e) {
      let index = e.currentTarget.dataset.index;
      this.setXmove(index, 0);
    },

    // 设置movable-view位移
    setXmove: function (index, xmove) {
      try {
        let taskList = this.data.taskList;
        taskList[index].xmove = xmove;
        this.setData({
          taskList: taskList,
        });
      } catch (error) {
        return error;
      }
    },

    // 处理movable-view移动事件
    handleMovableChange: function (e) {
      if (e.detail.source === 'friction') {
        if (e.detail.x < -60) {
          this.showDeleteButton(e);
        } else {
          this.hideDeleteButton(e);
        }
      } else if (e.detail.source === 'out-of-bounds' && e.detail.x === 0) {
        this.hideDeleteButton(e);
      }
    },

    // 处理touchstart事件
    handleTouchStart(e) {
      this.startX = e.touches[0].pageX;
    },

    // 处理touchend事件
    handleTouchEnd(e) {
      if (
        e.changedTouches[0].pageX < this.startX &&
        e.changedTouches[0].pageX - this.startX <= -60
      ) {
        this.showDeleteButton(e);
      } else if (
        e.changedTouches[0].pageX > this.startX &&
        e.changedTouches[0].pageX - this.startX < 60
      ) {
        this.showDeleteButton(e);
      } else {
        this.hideDeleteButton(e);
      }
    },

    //触发编辑任务按钮
    handleEditProduct(e) {
      let item = JSON.stringify(e.currentTarget.dataset.item);
      wx.navigateTo({
        url: '/pages/taskDetail/taskDetail?item=' + item,
        success: res => {},
        fail: err => console.log(err, '跳转发生错误'),
      });
      this.setXmove(e.currentTarget.dataset.index, 0);
    },

    // 删除产品
    async handleDeleteProduct(e) {
      let id = e.currentTarget.dataset.id;
      let type = e.currentTarget.dataset.type;
      let taskList = this.data.taskList;
      let index = taskList.findIndex(item => item.id === id);

      wx.showLoading({
        title: '加载中...',
      });
      const { data: res } = await deleteTask([id]);
      wx.hideLoading();
      if (res.success) {
        taskList.splice(index, 1);
        if (type === 0) {
          app.globalData.task = this.data.taskList;
        } else {
          app.globalData.finish_task = this.data.taskList;
        }
        if (type === 0) {
          app.globalData.unfinish_sum = app.globalData.unfinish_sum - 1;
        } else {
          app.globalData.finish_sum = app.globalData.finish_sum - 1;
        }
        wx.showToast({
          title: '删除成功！',
          icon: 'none',
          image: '',
          duration: 500,
          mask: false,
        });
      }
    },
  },

  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
