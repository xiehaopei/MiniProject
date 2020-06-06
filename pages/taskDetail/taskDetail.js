import { changeTask } from '../../service/changeTask';
import { getTask } from '../../service/getTask';

let app = getApp();

//Page Object
Page({
  data: {
    taskInfo: {},
    items: [
      {
        name: 'yes',
        value: '是',
      },
      {
        name: 'no',
        value: '否',
      },
    ],
    priority: ['无', '重要且紧急', '重要但不紧急', '紧急但不重要', '不紧急且不重要'],
    priorityIndex: 0,
    textAreaContent: '',
  },
  backHome() {
    wx.navigateBack({
      delta: 1,
    });
  },
  //options(Object)
  onLoad: function (options) {
    let item = JSON.parse(options.item);
    if (!item.description) {
      item.description = '';
    }
    this.setData({
      taskInfo: item,
      priorityIndex: item.priority,
      textAreaContent: item.description,
    });
    this.getColor(item.priority);
  },
  //监听优先度选择
  changePriority(e) {
    this.setData({
      priorityIndex: e.detail.value,
    });
    this.getColor(e.detail.value);
  },
  getColor(priority) {
    if (priority == 0) {
      this.setData({
        itemColor: '#2c2c2c',
      });
    }
    if (priority == 1) {
      this.setData({
        itemColor: '#d81e06',
      });
    }
    if (priority == 2) {
      this.setData({
        itemColor: '#f4ea2a',
      });
    }
    if (priority == 3) {
      this.setData({
        itemColor: '#1296db',
      });
    }
    if (priority == 4) {
      this.setData({
        itemColor: '#1afa29',
      });
    }
  },
  //监听单选框变化
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
  },
  //提交修改
  async formSubmit(e) {
    this.data.taskInfo.description = e.detail.value.description;
    if (e.detail.value.priority) {
      this.data.taskInfo.priority = e.detail.value.priority;
    }
    if (!e.detail.value.task_name) {
      wx.showToast({
        title: '请填写任务名称',
        icon: 'none',
        image: '',
        duration: 400,
        mask: true,
      });
    } else {
      this.data.taskInfo.name = e.detail.value.task_name;
      await changeTask(this.data.taskInfo, this.data.taskInfo.type);
      //重新发出请求
      const { data: res } = await getTask(this.data.taskInfo.type);
      if (this.data.taskInfo.type === 0) {
        if (res.data) {
          app.globalData.task = res.data.list;
        } else {
          app.globalData.task = [];
        }
      }
      if (this.data.taskInfo.type === 1) {
        if (res.data) {
          app.globalData.finish_task = res.data.list;
        } else {
          app.globalData.finish_task = [];
        }
      }
      this.backHome();
    }
  },
});
