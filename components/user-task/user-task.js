//Component Object
let app = getApp();

Component({
  properties: {
    myProperty: {
      type: String,
      value: '',
      observer: function () {},
    },
  },
  data: {
    tasksTotal: 0,
    finishTasksTotal: 0,
    unfinishTasksTotal: 0,
  },
  methods: {},
  created: function () {},
  attached: function () {},
  ready: function () {
    this.setData({
      finishTasksTotal: app.globalData.finish_sum,
      unfinishTasksTotal: app.globalData.unfinish_sum,
      tasksTotal: app.globalData.finish_sum + app.globalData.unfinish_sum,
    });
  },
  moved: function () {},
  detached: function () {},
});
