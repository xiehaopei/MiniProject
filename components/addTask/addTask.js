//Component Object
let app = getApp();

Component({
  properties: {
    childAttr: String,
    syncAttrMap: String
  },
  data: {
    animationData: {}, //内容动画
    animationMask: {}, //蒙板动画
    refresh: true, //更多设置按钮
    zindex: 1000 //z-index设置
  },
  methods: {
    // 子组件更新数据时，只要调用此方法即可，而不是 `setData`
    setDataSmart(data) {
      // 双向绑定的父组件数据触发事件让父组件自己去更新
      this.triggerEvent('syncAttrUpdate', data)
    },
    // 显示
    showModal: function () {
      this.animateTrans.translateY(0).step()
      this.animateFade.opacity(1).step()
      this.setData({
        animationData: this.animateTrans.export(), //动画实例的export方法导出动画数据传递给组件的animation属性
        animationMask: this.animateFade.export(),
      })
      this.childAttr = true
      this.setDataSmart(this.childAttr)
      this.setData({
        refresh: true,
      })
    },
    // 隐藏
    hideModal: function () {
      this.animateTrans.height("200rpx").step()
      this.animateFade.opacity(0).step()
      this.setData({
        animationData: this.animateTrans.export(),
        animationMask: this.animateFade.export()
      })
      this.childAttr = false
      this.setDataSmart(this.childAttr)
      this.setData({
        refresh: false,
      })
    },
    //调用隐藏方法
    callHidden() {
      this.hideModal()
    },
    //向上移动
    moveUp() {
      console.log('up')
      this.animateTrans.height("800rpx").step()
      this.setData({
        animationData: this.animateTrans.export()
      })

    }
  },

  created: function () {
    this.animateTrans = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })

    this.animateFade = wx.createAnimation({
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

  }
});