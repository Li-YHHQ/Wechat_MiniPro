// pages/mine/index.js
const request = require('../../utils/request')

Page({
  data: {
    userInfo: { displayName: '管理员', role: '药店管理员' }
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
    this.loadUserInfo()
  },

  async loadUserInfo() {
    const cached = wx.getStorageSync('userInfo')
    if (cached) {
      this.setData({ userInfo: this._normalizeUser(cached) })
    }
    try {
      const res = await request({ url: '/users/me' })
      const user = res.data || res
      wx.setStorageSync('userInfo', user)
      this.setData({ userInfo: this._normalizeUser(user) })
    } catch (e) {
      // keep cached or default
    }
  },

  _normalizeUser(user) {
    return {
      ...user,
      displayName: user.username || user.name || user.nickname || user.display_name || '管理员',
      role: user.role || user.position || '药店管理员',
    }
  },

  goToPassword() {
    wx.navigateTo({ url: '/pages/mine/password/index' })
  },

  onLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确认退出当前账号？',
      confirmText: '退出',
      confirmColor: '#EF4444',
      success(res) {
        if (res.confirm) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
          wx.reLaunch({ url: '/pages/login/index' })
        }
      }
    })
  }
})
