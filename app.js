// app.js
App({
  onLaunch() {
    wx.reLaunch({ url: '/pages/dashboard/index' })
  },
  globalData: {
    userInfo: null
  }
})
