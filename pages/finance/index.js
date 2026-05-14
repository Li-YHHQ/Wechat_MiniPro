// pages/finance/index.js
const request = require('../../utils/request')

function pad(n) { return String(n).padStart(2, '0') }

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function monthStartStr() {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`
}

Page({
  data: {
    startDate: '',
    endDate: '',
    loading: false,
    summary: null,
    details: [],
  },

  _inited: false,

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
    if (this._inited) this.loadSummary()
  },

  onLoad() {
    this.setData({ startDate: monthStartStr(), endDate: todayStr() })
    this.loadSummary().finally(() => { this._inited = true })
  },

  onPullDownRefresh() {
    this.loadSummary().finally(() => wx.stopPullDownRefresh())
  },

  onStartDateChange(e) {
    this.setData({ startDate: e.detail.value })
    this.loadSummary()
  },

  onEndDateChange(e) {
    this.setData({ endDate: e.detail.value })
    this.loadSummary()
  },

  async loadSummary() {
    const { startDate, endDate } = this.data
    this.setData({ loading: true })
    try {
      const [sumRes, dailyRes] = await Promise.all([
        request({ url: '/finance/summary', data: { startDate, endDate } }),
        request({ url: '/finance/daily',   data: { startDate, endDate } }),
      ])
      const s = sumRes.data || sumRes
      const summary = {
        totalSales:  s.salesAmount  ?? 0,
        totalCost:   s.costAmount   ?? 0,
        grossProfit: s.profitAmount ?? 0,
        grossMargin: (s.salesAmount > 0) ? (s.profitAmount / s.salesAmount * 100) : 0,
      }
      const raw = dailyRes.data || dailyRes
      const list = Array.isArray(raw) ? raw : raw.list || raw.data || []
      const details = list.map(item => ({
        ...item,
        _date:   item.statDate    || '-',
        _sales:  item.salesAmount  ?? 0,
        _cost:   item.costAmount   ?? 0,
        _profit: item.profitAmount ?? 0,
      }))
      this.setData({ summary, details })
    } catch (e) {
      wx.showToast({ title: e.message || '数据加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  },

  fmtMoney(val) {
    if (val == null) return '--'
    return Number(val).toFixed(2)
  },
})
