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

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  onLoad() {
    this.loadIn(true)
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
      const res = await request({ url: '/stock-in', data: { page, size: PAGE_SIZE } })
      const raw = res.data || res
      const items = (Array.isArray(raw) ? raw : raw.list || raw.data || []).map(item => ({
        ...item,
        _time: fmtDate(item.created_at || item.in_time || item.inbound_time),
        _qty: item.quantity ?? item.in_quantity ?? '-',
        _batch: item.batch_number || item.batch_no || '-',
        _name: item.drug_name || (item.drug && item.drug.drug_name) || '-',
      }))
      const total = raw.total ?? items.length
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
      const res = await request({ url: '/stock-out', data: { page, size: PAGE_SIZE } })
      const raw = res.data || res
      const OUT_TYPE_MAP = { sale: '销售', loss: '损耗', return: '退货', sales: '销售' }
      const items = (Array.isArray(raw) ? raw : raw.list || raw.data || []).map(item => {
        const rawType = item.out_type || item.type || ''
        const typeLabel = OUT_TYPE_MAP[rawType] || rawType || '-'
        const typeClass = rawType === 'sale' || rawType === 'sales' ? 'sale'
          : rawType === 'loss' ? 'loss'
          : rawType === 'return' ? 'ret' : 'sale'
        return {
          ...item,
          _time: fmtDate(item.created_at || item.out_time),
          _qty: item.quantity ?? item.out_quantity ?? '-',
          _type: typeLabel,
          _typeClass: typeClass,
          _amount: item.amount ?? item.total_amount,
          _name: item.drug_name || (item.drug && item.drug.drug_name) || '-',
        }
      })
      const total = raw.total ?? items.length
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
