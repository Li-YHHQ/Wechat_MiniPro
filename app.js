// app.js
App({
  onLaunch() {
    const token = wx.getStorageSync('token')
    if (token) {
      wx.reLaunch({ url: '/pages/dashboard/index' })
    }
    // 无 token：login 是 pages[0]，默认启动即进入登录页
  },
  globalData: {
    userInfo: null
  }
})
