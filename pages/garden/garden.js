// pages/garden/garden.js
const BUILDINGS = [
  { id: 101, name: '御花园', desc: '皇家私家花园，亭台楼阁，古木奇石', img: 'https://picsum.photos/120/120?random=7' },
  { id: 102, name: '慈宁宫花园', desc: '太后专属花园，清幽雅致，松柏参天', img: 'https://picsum.photos/120/120?random=8' },
  { id: 103, name: '建福宫花园', desc: '乾隆御园，珍宝云集，装饰华丽', img: 'https://picsum.photos/120/120?random=9' },
  { id: 104, name: '宁寿宫花园', desc: '乾隆退位后的养老之所，宫中之宫', img: 'https://picsum.photos/120/120?random=10' }
]

Page({
  data: {
    swiperImages: [
      'https://picsum.photos/750/400?random=1',
      'https://picsum.photos/750/400?random=2',
      'https://picsum.photos/750/400?random=3'
    ],
    allList: BUILDINGS,
    displayList: [],
    showList: false,
    mode: 'collapse',
    loading: true,
    fadeIn: false
  },

  onLoad() {
    this.setData({ loading: true, fadeIn: false })
    setTimeout(() => {
      this.setData({
        allList: BUILDINGS,
        displayList: [],
        showList: false,
        loading: false
      })
      setTimeout(() => this.setData({ fadeIn: true }), 50)
    }, 800)
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },

  onPullDownRefresh() {
    this.setData({ loading: true, fadeIn: false, showList: false })
    setTimeout(() => {
      this.setData({ loading: false })
      setTimeout(() => this.setData({ fadeIn: true }), 50)
      wx.stopPullDownRefresh()
    }, 1000)
  },

  onReachBottom() {
    wx.showToast({ title: '已是最新数据', icon: 'none', duration: 1500 })
  },

  handleExpand() {
    this.setData({ showList: true, displayList: this.data.allList, mode: 'all' })
  },

  handleHalf() {
    const half = Math.ceil(this.data.allList.length / 2)
    this.setData({ showList: true, displayList: this.data.allList.slice(0, half), mode: 'half' })
  },

  handleCollapse() {
    this.setData({ showList: false, displayList: [], mode: 'collapse' })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
