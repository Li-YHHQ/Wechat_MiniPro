// pages/mine/mine.js
Page({
  data: {
    version: 'v1.0.0'
  },
  onLoad() {},
  onMenuTap(e) {
    const item = e.currentTarget.dataset.item
    wx.showToast({ title: item, icon: 'none' })
  }
})
