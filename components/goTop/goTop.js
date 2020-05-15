Component({
  properties: {
    goTop: {
      type: Boolean,
      value: false
    }
  },
  data: {
    
  },
  methods: {
    // 回顶部事件
    goTop: function (e) {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 200
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  }
})