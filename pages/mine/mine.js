// pages/mine/mine.js
Page({
  data: {
    version: 'v1.0.0'
  },
  onLoad() {},
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 4 })
    }
  },
  onMenuTap(e) {
    const item = e.currentTarget.dataset.item
    wx.showToast({ title: item, icon: 'none' })
  }
})
