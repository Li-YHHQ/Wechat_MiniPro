// pages/login/index.js
const request = require('../../utils/request')

Page({
  data: {
    username: '',
    password: '',
    loading: false
  },

  onInputUsername(e) {
    this.setData({ username: e.detail.value })
  },

  onInputPassword(e) {
    this.setData({ password: e.detail.value })
  },

  dismissKeyboard() {
    wx.hideKeyboard({ complete: () => {} })
  },

  async onLogin() {
    const { username, password } = this.data
    if (!username || !password) {
      wx.showToast({ title: '请输入用户名和密码', icon: 'none' })
      return
    }
    this.setData({ loading: true })
    try {
      const res = await request({
        url: '/auth/login',
        method: 'POST',
        data: { username, password }
      })
      if (res && res.token) {
        wx.setStorageSync('token', res.token)
        const userInfo = res.user || res.userInfo || (res.username ? { username: res.username } : null)
        if (userInfo) wx.setStorageSync('userInfo', userInfo)
        wx.reLaunch({ url: '/pages/dashboard/index' })
      } else {
        wx.showToast({ title: (res && res.message) || '登录失败', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: e.message || '登录失败，请重试', icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  }
})
