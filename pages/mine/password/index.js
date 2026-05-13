// pages/mine/password/index.js
const request = require('../../../utils/request')

Page({
  data: {
    oldPassword:     '',
    newPassword:     '',
    confirmPassword: '',
    submitting:      false,
  },

  onOldPasswordInput(e)     { this.setData({ oldPassword:     e.detail.value }) },
  onNewPasswordInput(e)     { this.setData({ newPassword:     e.detail.value }) },
  onConfirmPasswordInput(e) { this.setData({ confirmPassword: e.detail.value }) },

  async onSubmit() {
    const { oldPassword, newPassword, confirmPassword, submitting } = this.data
    if (submitting) return

    if (!oldPassword)     { wx.showToast({ title: '请输入旧密码', icon: 'none' }); return }
    if (!newPassword)     { wx.showToast({ title: '请输入新密码', icon: 'none' }); return }
    if (newPassword.length < 6) { wx.showToast({ title: '新密码至少6位', icon: 'none' }); return }
    if (newPassword !== confirmPassword) {
      wx.showToast({ title: '两次新密码不一致', icon: 'none' }); return
    }

    this.setData({ submitting: true })
    try {
      await request({ url: '/users/password', method: 'PUT', data: { oldPassword, newPassword } })
      wx.showToast({ title: '修改成功', icon: 'success' })
      setTimeout(() => wx.navigateBack(), 1200)
    } catch (e) {
      wx.showToast({ title: e.message || '修改失败，请检查旧密码', icon: 'none' })
    } finally {
      this.setData({ submitting: false })
    }
  },
})
