// pages/garden/garden.js
const BUILDINGS = [
  { id: 101, name: "御花园", desc: "皇家私家花园，亭台楼阁，古木奇石" },
  { id: 102, name: "慈宁宫花园", desc: "太后专属花园，清幽雅致，松柏参天" },
  { id: 103, name: "建福宫花园", desc: "乾隆御园，珍宝云集，装饰华丽" },
  { id: 104, name: "宁寿宫花园", desc: "乾隆退位后的养老之所，宫中之宫" }
]

Page({
  data: {
    swiperImages: [
      'https://via.placeholder.com/750x400/6B8E5A/FFFFFF?text=花园一',
      'https://via.placeholder.com/750x400/4A7A3A/FFFFFF?text=花园二',
      'https://via.placeholder.com/750x400/8B6914/FFFFFF?text=花园三'
    ],
    allBuildings: BUILDINGS,
    displayBuildings: BUILDINGS,
    total: BUILDINGS.length,
    mode: 'all'
  },

  onLoad() {},

  expand() {
    this.setData({ displayBuildings: this.data.allBuildings, mode: 'all' })
  },

  showHalf() {
    const half = Math.ceil(this.data.allBuildings.length / 2)
    this.setData({ displayBuildings: this.data.allBuildings.slice(0, half), mode: 'half' })
  },

  collapse() {
    this.setData({ displayBuildings: this.data.allBuildings.slice(0, 2), mode: 'collapse' })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
