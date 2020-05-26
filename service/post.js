export default function (option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: option.url,
      data: option.data || {},
      header: {
        "Content-Type": "application/json",
        "userId": wx.getStorageSync('userId')
      },
      method: 'POST',
      success: resolve,
      fail: reject
    })
  })
}