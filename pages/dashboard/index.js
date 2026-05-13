// pages/dashboard/index.js
Page({
  data: {
    stats: [
      { label: '今日销售额', value: '--', unit: '元', icon: '💰', color: '#0EA5E9' },
      { label: '今日订单数', value: '--', unit: '单', icon: '📋', color: '#10B981' },
      { label: '库存预警', value: '--', unit: '种', icon: '⚠️', color: '#F59E0B' },
      { label: '近效期药品', value: '--', unit: '种', icon: '⏰', color: '#EF4444' }
    ]
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  onLogout() {
    wx.removeStorageSync('token')
    wx.reLaunch({ url: '/pages/login/index' })
  }
})
