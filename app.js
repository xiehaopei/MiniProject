//app.js
App({
  onLaunch: function () {},
  // 监听未完成任务，要在其他界面监听，这个监听方法，需要一个回调方法。
  watch_task: function (method, page) {
    var obj = this.globalData;
    Object.defineProperty(obj, "task", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._task = value
        //在此定义method的参数
        method(value, page)
      },
      get: function () {
        // 在其他界面调用getApp().globalData.task的时候，这里就会执行。
        return this._task
      }
    });
  },
  //监听已完成任务
  watch_finish_task: function (method, page) {
    var obj = this.globalData;
    Object.defineProperty(obj, "finish_task", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._finish_task = value
        //在此定义method的参数
        method(value, page)
      },
      get: function () {
        // 在其他界面调用getApp().globalData.finish_task的时候，这里就会执行。
        return this._finish_task
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: 0,
    date: null,
    _task: [],
    _finish_task: []
  },
})