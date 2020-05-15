export default function (option) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: option.url,
      data: option.data || {},
      method: 'POST',
      success: resolve,
      fail: reject
    })
  })
}