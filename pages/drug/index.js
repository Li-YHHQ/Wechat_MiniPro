// pages/drug/index.js
const request = require('../../utils/request')

const PAGE_SIZE = 20

Page({
  data: {
    list: [],
    page: 1,
    total: 0,
    hasMore: true,
    loading: false,
    loadingMore: false,
    searchKeyword: '',
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
        data: { page: nextPage, size: PAGE_SIZE, drug_name: searchKeyword || undefined }
      })
      const raw = res.data || res
      const items = (Array.isArray(raw) ? raw : raw.list || raw.data || []).map(item => ({
        ...item,
        statusOk: (item.current_stock ?? item.stock_quantity ?? 0) > (item.low_stock_threshold ?? 0)
      }))
      const total = raw.total ?? items.length

      this.setData({
        list: reset ? items : [...this.data.list, ...items],
        page: nextPage + 1,
        total,
        hasMore: items.length === PAGE_SIZE
      })
    } catch (e) {
      wx.showToast({ title: '加载失败', icon: 'none' })
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
