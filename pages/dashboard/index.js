// pages/dashboard/index.js
const request = require('../../utils/request')

Page({
  data: {
    loading: true,
    stats: [
      { label: '今日销售额', value: '--', unit: '元', icon: '💰', color: '#0EA5E9' },
      { label: '药品总数',   value: '--', unit: '种', icon: '💊', color: '#10B981' },
      { label: '库存预警',   value: '--', unit: '种', icon: '⚠️', color: '#F59E0B' },
      { label: '近效期药品', value: '--', unit: '种', icon: '⏰', color: '#EF4444' }
    ]
  },

  _inited: false,

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    if (this._inited) this.loadOverview()
  },

  onLoad() {
    this.loadOverview().finally(() => { this._inited = true })
  },

  onPullDownRefresh() {
    this.loadOverview().finally(() => wx.stopPullDownRefresh())
  },

  async loadOverview() {
    this.setData({ loading: true })
    try {
      const res = await request({ url: '/dashboard/overview' })
      const data = res.data || res
      const stats = [
        { label: '今日销售额', value: data.todaySales   ?? '--', unit: '元', icon: '💰', color: '#0EA5E9' },
        { label: '药品总数',   value: data.totalDrugs   ?? '--', unit: '种', icon: '💊', color: '#10B981' },
        { label: '库存预警',   value: data.lowStockCount   ?? '--', unit: '种', icon: '⚠️', color: '#F59E0B' },
        { label: '近效期药品', value: data.nearExpireCount ?? '--', unit: '种', icon: '⏰', color: '#EF4444' }
      ]
      this.setData({ stats })
    } catch (e) {
      wx.showToast({ title: '数据加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  },

  goToDrug()    { wx.switchTab({ url: '/pages/drug/index' }) },
  goToStock()   { wx.switchTab({ url: '/pages/stock/index' }) },
  goToFinance() { wx.switchTab({ url: '/pages/finance/index' }) },
  goToMine()    { wx.switchTab({ url: '/pages/mine/index' }) },

  onLogout() {
    wx.removeStorageSync('token')
    wx.reLaunch({ url: '/pages/login/index' })
  }
})
