// pages/mine/index.js
Page({
  data: {},
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
  },
  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确认退出当前账号？',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.reLaunch({ url: '/pages/login/index' })
        }
      }
    })
  }
})
