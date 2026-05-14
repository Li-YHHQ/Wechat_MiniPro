// pages/drug/index.js
const request = require('../../utils/request')

const PAGE_SIZE = 20

const TINTS = ['t-cyan', 't-blue', 't-amber', 't-rose', 't-violet', 't-emerald']

function tintFor(item) {
  const key = String(item.id || item.drugCode || item.drugName || '')
  let hash = 0
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  return TINTS[hash % TINTS.length]
}

function fmtMoney(v) {
  if (v == null || v === '') return '--'
  return Number(v).toFixed(2)
}

Page({
  data: {
    list: [],
    page: 1,
    total: 0,
    hasMore: true,
    loading: false,
    loadingMore: false,
    searchKeyword: '',
    searchFocused: false,
  },

  _searchTimer: null,
  _inited: false,

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    if (this._inited) this.loadList(true)
  },

  onLoad() {
    this.loadList(true).finally(() => { this._inited = true })
  },

  onPullDownRefresh() {
    this.loadList(true).finally(() => wx.stopPullDownRefresh())
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadList(false)
    }
  },

  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({ searchKeyword: keyword })
    clearTimeout(this._searchTimer)
    this._searchTimer = setTimeout(() => {
      this.loadList(true)
    }, 400)
  },

  onSearchFocus() { this.setData({ searchFocused: true }) },
  onSearchBlur()  { this.setData({ searchFocused: false }) },

  onSearchClear() {
    this.setData({ searchKeyword: '' })
    this.loadList(true)
  },

  async loadList(reset) {
    if (reset) {
      this.setData({ loading: true, page: 1, list: [], hasMore: true })
    } else {
      this.setData({ loadingMore: true })
    }

    const { page, searchKeyword } = this.data
    const nextPage = reset ? 1 : page

    try {
      const res = await request({
        url: '/drugs',
        data: { page: nextPage, size: PAGE_SIZE, keyword: searchKeyword || undefined }
      })
      const items = (res.list || []).map(item => ({
        ...item,
        _name:        item.drugName,
        _spec:        item.spec || '',
        _manuf:       item.manufacturer || '',
        _category:    item.category || '',
        _retail:      fmtMoney(item.retailPrice),
        _cost:        fmtMoney(item.costPrice),
        _stockMin:    item.stockMin != null ? String(item.stockMin) : '--',
        _initial:     (item.drugName || '?').slice(0, 1),
        _tint:        tintFor(item),
        _statusOk:    item.status === 1,
        _statusLabel: item.status === 1 ? '在售' : '停售',
      }))
      const total = res.total || 0

      this.setData({
        list: reset ? items : [...this.data.list, ...items],
        page: nextPage + 1,
        total,
        hasMore: items.length === PAGE_SIZE
      })
    } catch (e) {
      wx.showToast({ title: e.message || '加载失败', icon: 'none' })
    } finally {
      this.setData({ loading: false, loadingMore: false })
    }
  },

  goToAdd() {
    wx.navigateTo({ url: '/pages/drug/add/index' })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/index?drugId=${id}` })
  }
})
