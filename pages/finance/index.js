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

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  onLoad() {
    this.setData({ startDate: monthStartStr(), endDate: todayStr() })
    this.loadSummary()
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
        url: '/finance/summary',
        data: { startDate, endDate }
      })
      const data = res.data || res
      const summary = {
        totalSales:  data.totalSales  ?? data.total_sales  ?? 0,
        totalCost:   data.totalCost   ?? data.total_cost   ?? 0,
        grossProfit: data.grossProfit ?? data.gross_profit ?? 0,
        grossMargin: data.grossMargin ?? data.gross_margin ?? 0,
      }
      const details = (data.details ?? data.dailyDetails ?? data.daily ?? []).map(item => ({
        ...item,
        _date:   item.date || item.stat_date || '-',
        _sales:  item.sales  ?? item.total_sales  ?? 0,
        _cost:   item.cost   ?? item.total_cost   ?? 0,
        _profit: item.profit ?? item.gross_profit ?? (
          (item.sales ?? item.total_sales ?? 0) - (item.cost ?? item.total_cost ?? 0)
        ),
      }))
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
