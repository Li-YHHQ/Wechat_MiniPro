// pages/dashboard/index.js
const request = require('../../utils/request')

function pad(n) { return String(n).padStart(2, '0') }

function todayLabel() {
  const d = new Date()
  const week = ['周日','周一','周二','周三','周四','周五','周六'][d.getDay()]
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 · ${week}`
}

function greetingByHour() {
  const h = new Date().getHours()
  if (h < 6)  return '凌晨好'
  if (h < 11) return '早上好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
}

function fmtMoney(v) {
  if (v == null) return '0.00'
  return Number(v).toFixed(2)
}

function fmtMd(s) {
  if (!s) return ''
  const d = new Date(s)
  if (isNaN(d.getTime())) return s
  return `${d.getMonth() + 1}/${d.getDate()}`
}

Page({
  data: {
    loading: true,
    greeting: '',
    today: '',
    userName: '管理员',

    todaySales: '0.00',
    todayProfit: '0.00',
    monthSales: '0.00',
    monthProfit: '0.00',

    stats: [
      { key: 'totalDrugCount',    label: '药品总数', value: '--', icon: '💊', tint: 'tint-cyan' },
      { key: 'totalStock',        label: '库存总量', value: '--', icon: '📦', tint: 'tint-blue' },
      { key: 'lowStockCount',     label: '库存预警', value: '--', icon: '⚠️', tint: 'tint-amber' },
      { key: 'expiringSoonCount', label: '近效期',   value: '--', icon: '⏰', tint: 'tint-rose' },
    ],

    chartBars: [],
  },

  _inited: false,

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
    if (this._inited) this.loadOverview()
  },

  onLoad() {
    const cached = wx.getStorageSync('userInfo') || {}
    this.setData({
      greeting: greetingByHour(),
      today: todayLabel(),
      userName: cached.username || cached.name || '管理员',
    })
    this.loadOverview().finally(() => { this._inited = true })
  },

  onPullDownRefresh() {
    this.loadOverview().finally(() => wx.stopPullDownRefresh())
  },

  async loadOverview() {
    this.setData({ loading: true })
    try {
      const data = await request({ url: '/dashboard' })

      const stats = this.data.stats.map(s => ({
        ...s,
        value: data[s.key] != null ? data[s.key] : '--',
      }))

      const list = Array.isArray(data.recentFinanceList) ? data.recentFinanceList : []
      const max = list.reduce((m, x) => Math.max(m, Number(x.salesAmount) || 0), 0)
      const chartBars = list.map(x => {
        const v = Number(x.salesAmount) || 0
        const pct = max > 0 ? Math.round(v / max * 100) : 0
        return {
          date: fmtMd(x.statDate),
          value: fmtMoney(v),
          heightPct: Math.max(pct, v > 0 ? 8 : 4),
          empty: v <= 0,
        }
      })

      this.setData({
        stats,
        chartBars,
        todaySales:  fmtMoney(data.todaySalesAmount),
        todayProfit: fmtMoney(data.todayProfitAmount),
        monthSales:  fmtMoney(data.monthSalesAmount),
        monthProfit: fmtMoney(data.monthProfitAmount),
      })
    } catch (e) {
      wx.showToast({ title: e.message || '数据加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false })
    }
  },

  goToDrug()    { wx.switchTab({ url: '/pages/drug/index' }) },
  goToStock()   { wx.switchTab({ url: '/pages/stock/index' }) },
  goToFinance() { wx.switchTab({ url: '/pages/finance/index' }) },
  goToMine()    { wx.switchTab({ url: '/pages/mine/index' }) },
})
