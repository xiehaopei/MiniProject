//app.js
App({
  onLaunch: function () {
  },
  // 要在其他界面监听，这个监听方法，需要一个回调方法。
  watch: function (method , page) {
    var obj = this.globalData;
    Object.defineProperty(obj, "task", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._task = value;
        console.log('监听到全局变量变化，执行回调');
        //在此定义method的参数
        method(value , page);
      },
      get: function () {
        // 在其他界面调用getApp().globalData.task的时候，这里就会执行。
        return this._task
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    date: null,
    _task: []
  },
})