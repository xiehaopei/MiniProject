//Component Object
import request from "../../service/post.js";
import {
  login
} from "../../service/login.js";


let app = getApp();

Component({
  properties: {
    indexShow: {
      type: Boolean,
      value: true,
      observer: function () {
        
      },
    }
  },
  data: {
    tasks: [],
    finish_tasks: [],
    time: [],
    task_length: 0,
    finish_task_length: 0,
    isShow: true,
  },
  methods: {
    //全局变量监听函数,用于监听未完成任务列表变化，第一个参数为变量，第二个参数为当前对象
    watchTask(task, that) {
      console.log('监听到task变化', task);
      that.setData({
        tasks: task
      })
      //如果任务列表没有任务则不显示列表
      if (task.length) {
        that.setData({
          task_length: 1
        })
      } else {
        that.setData({
          task_length: 0
        })
      }
      that.isShow()
    },
    //全局变量监听函数,用于监听已完成任务列表变化
    watchFinishTask(finish_task, that) {
      console.log('监听到finish_task变化', finish_task);
      that.setData({
        finish_tasks: finish_task
      })
      //如果任务列表没有任务则不显示列表
      if (finish_task.length) {
        that.setData({
          finish_task_length: 1
        })
      } else {
        that.setData({
          finish_task_length: 0
        })
      }
      that.isShow()
    },
    isShow() {
      if (this.data.task_length === 0 && this.data.finish_task_length === 0) {
        this.setData({
          isShow: false
        })
      } else {
        this.setData({
          isShow: true
        })
      }
    }
  },
  created: function () {
    let that = this;
    //对未完成任务列表变化进行监听
    getApp().watch_task(that.watchTask, that);
    //对已完成任务列表变化进行监听
    getApp().watch_finish_task(that.watchFinishTask, that);
  },
  attached: function () {

  },
  ready: function () {

  },
  moved: function () {},
  detached: function () {},
});