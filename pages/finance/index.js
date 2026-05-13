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
      const res = await request({
        url: '/finance/daily',
        data: { startDate, endDate }
      })
      const raw = res.data || res
      const list = Array.isArray(raw) ? raw : raw.list || raw.data || []
      const details = list.map(item => ({
        ...item,
        _date:   item.statDate    || item.stat_date    || '-',
        _sales:  item.salesAmount  ?? item.sales_amount  ?? 0,
        _cost:   item.costAmount   ?? item.cost_amount   ?? 0,
        _profit: item.profitAmount ?? item.profit_amount ?? 0,
      }))
      const totalSales  = details.reduce((s, r) => s + Number(r._sales),  0)
      const totalCost   = details.reduce((s, r) => s + Number(r._cost),   0)
      const grossProfit = details.reduce((s, r) => s + Number(r._profit), 0)
      const grossMargin = totalSales > 0 ? (grossProfit / totalSales * 100) : 0
      const summary = { totalSales, totalCost, grossProfit, grossMargin }
      this.setData({ summary, details })
    } catch (e) {
      wx.showToast({ title: '数据加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  },

  fmtMoney(val) {
    if (val == null) return '--'
    return Number(val).toFixed(2)
  },
})
