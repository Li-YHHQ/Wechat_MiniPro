// pages/stock/index.js
const request = require('../../utils/request')

const PAGE_SIZE = 20

function fmtDate(s) {
  if (!s) return '-'
  const d = new Date(s)
  if (isNaN(d.getTime())) return s
  const p = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

Page({
  data: {
    activeTab: 0,

    inList: [], inPage: 1, inTotal: 0, inHasMore: true,
    inLoading: false, inLoadingMore: false,

    outList: [], outPage: 1, outTotal: 0, outHasMore: true,
    outLoading: false, outLoadingMore: false,
  },

  _inited: false,

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
    if (this._inited) {
      const { activeTab } = this.data
      if (activeTab === 0) this.loadIn(true)
      else this.loadOut(true)
    }
  },

  onLoad() {
    this.loadIn(true).finally(() => { this._inited = true })
  },

  onPullDownRefresh() {
    const { activeTab } = this.data
    const p = activeTab === 0 ? this.loadIn(true) : this.loadOut(true)
    p.finally(() => wx.stopPullDownRefresh())
  },

  onReachBottom() {
    const { activeTab, inHasMore, inLoadingMore, outHasMore, outLoadingMore } = this.data
    if (activeTab === 0 && inHasMore && !inLoadingMore) this.loadIn(false)
    if (activeTab === 1 && outHasMore && !outLoadingMore) this.loadOut(false)
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    if (tab === this.data.activeTab) return
    this.setData({ activeTab: tab })
    if (tab === 0 && !this.data.inList.length) this.loadIn(true)
    if (tab === 1 && !this.data.outList.length) this.loadOut(true)
  },

  async loadIn(reset) {
    if (reset) {
      this.setData({ inLoading: true, inPage: 1, inList: [], inHasMore: true })
    } else {
      this.setData({ inLoadingMore: true })
    }
    const page = reset ? 1 : this.data.inPage
    try {
      const res = await request({ url: '/stock/in', data: { page, size: PAGE_SIZE } })
      const items = (res.list || []).map(item => ({
        ...item,
        _time:  fmtDate(item.createTime),
        _qty:   item.quantity ?? '-',
        _batch: item.batchNo || '-',
        _name:  item.drugName || '-',
      }))
      const total = res.total || 0
      this.setData({
        inList: reset ? items : [...this.data.inList, ...items],
        inPage: page + 1,
        inTotal: total,
        inHasMore: items.length === PAGE_SIZE,
      })
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      this.setData({ inLoading: false, inLoadingMore: false })
    }
  },

  async loadOut(reset) {
    if (reset) {
      this.setData({ outLoading: true, outPage: 1, outList: [], outHasMore: true })
    } else {
      this.setData({ outLoadingMore: true })
    }
    const page = reset ? 1 : this.data.outPage
    try {
      const res = await request({ url: '/stock/out', data: { page, size: PAGE_SIZE } })
      const OUT_TYPE_MAP  = { 1: '销售', 2: '损耗', 3: '退货' }
      const OUT_CLASS_MAP = { 1: 'sale', 2: 'loss', 3: 'ret' }
      const items = (res.list || []).map(item => {
        const t = item.outType
        return {
          ...item,
          _time:      fmtDate(item.createTime),
          _qty:       item.quantity ?? '-',
          _type:      OUT_TYPE_MAP[t]  || String(t || '-'),
          _typeClass: OUT_CLASS_MAP[t] || 'sale',
          _amount:    item.totalAmount,
          _name:      item.drugName || '-',
        }
      })
      const total = res.total || 0
      this.setData({
        outList: reset ? items : [...this.data.outList, ...items],
        outPage: page + 1,
        outTotal: total,
        outHasMore: items.length === PAGE_SIZE,
      })
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' })
    } finally {
      this.setData({ outLoading: false, outLoadingMore: false })
    }
  },

  goToAdd() {
    const { activeTab } = this.data
    if (activeTab === 0) {
      wx.navigateTo({ url: '/pages/stock/stockin-add/index' })
    } else {
      wx.navigateTo({ url: '/pages/stock/stockout-add/index' })
    }
  },
})
