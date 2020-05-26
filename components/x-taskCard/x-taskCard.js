import {
  changeTask
} from "../../service/changeTask";
import {
  getTask
} from "../../service/getTask";

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
      value: "",
    },
  },
  data: {
    //任务列表隐藏
    isTaskListHidden: false,
    //顶部文字栏
    showStatu: "收起",
  },
  methods: {
    //获取到来自组件的监听图标改变事件
    async changeType(e) {
      //true切换为完成，false切换为未完成
      if (e.detail === true) {
        await changeTask(e.currentTarget.dataset.item, 1)
        //重新发出请求
        const {
          data: res
        } = await getTask(1)
        if (res.data) {
          app.globalData.finish_task = res.data;
        } else {
          app.globalData.finish_task = [];
        }
        let index = app.globalData.task.findIndex(
          (item) => item.id === e.currentTarget.dataset.item.id
        )
        if (index >= 0) {
          app.globalData.task.splice(index, 1);
          app.globalData.task = app.globalData.task;
        } else {
          console.log("发生错误");
        }
      } else {
        await changeTask(e.currentTarget.dataset.item, 0)
        //重新发出请求
        const {
          data: res
        } = await getTask(0)
        if (res.data) {
          app.globalData.task = res.data;
        } else {
          app.globalData.task = [];
        }
        let index = app.globalData.finish_task.findIndex(
          (item) => item.id === e.currentTarget.dataset.item.id
        );
        if (index >= 0) {
          app.globalData.finish_task.splice(index, 1);
          app.globalData.finish_task = app.globalData.finish_task;
        } else {
          console.log("发生错误");
        }
      }
    },
    //隐藏/展示任务列表
    taskListHidden() {
      if (this.data.showStatu === "收起")
        this.setData({
          isTaskListHidden: !this.data.isTaskListHidden,
          showStatu: "展开",
        });
      else if (this.data.showStatu === "展开")
        this.setData({
          isTaskListHidden: !this.data.isTaskListHidden,
          showStatu: "收起",
        });
    },
    //跳转到任务详情页
    showTaskDetail(e) {
      let item = JSON.stringify(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '/pages/taskDetail/taskDetail?item=' + item,
        success: res => {},
        fail: err => console.log(err, '跳转发生错误')
      })
    }
  },

  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});