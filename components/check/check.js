//Component Object
Component({
  properties: {
    priority: {
      type: String,
      value: '',
      observer: function () {}
    },
    type: {
      type: Number,
      observer: function () {}
    }
  },
  data: {
    image: '',
    hasFinish: false //true为完成，false为未完成
  },
  methods: {
    //监视图标切换
    changeIcon(event) {
      console.log(event);
      //var index = event.currentTarget.dataset.index;
      //var item = this.data.Tasks[index];
      this.setData({
        hasFinish: !this.data.hasFinish
      })
    },
    //对优先度进行判断
    getPriority() {
      switch (this.data.priority) {
        case '1':
          this.setData({
            image: "/assets/check/check_red.svg"
          })
          break;
        case '2':
          this.setData({
            image: "/assets/check/check_yellow.svg"
          })
          break;
        case '3':
          this.setData({
            image: "/assets/check/check_blue.svg"
          })
          break;
        case '4':
          this.setData({
            image: "/assets/check/check_green.svg"
          })
          break;
        case '0':
          this.setData({
            image: "/assets/check/check_black.svg"
          })
          break;
        default:
          break;
      }
    }
  },
  created: function () {

  },
  attached: function () {
    //判断任务类型
    if (this.data.type === 0) {
      this.setData({
        hasFinish: false
      })
      //对优先度作判断
      this.getPriority()
    } else if (this.data.type === 1) {
      this.setData({
        hasFinish: true
      })
    }
  },
  ready: function () {

  },
  moved: function () {

  },
  detached: function () {

  },
});