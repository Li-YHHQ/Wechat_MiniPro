// pages/palace/palace.js
const BUILDINGS = [
  { id: 1, name: "太和殿", desc: "紫禁城最宏伟的殿宇，皇帝举行大典之所" },
  { id: 2, name: "乾清宫", desc: "皇帝日常起居与处理政务的地方" },
  { id: 3, name: "御花园", desc: "皇家私家花园，古木参天，奇石异卉" },
  { id: 4, name: "角楼", desc: "紫禁城四角的瞭望楼，造型精巧绝伦" },
  { id: 5, name: "午门", desc: "紫禁城正门，气势威严" },
  { id: 6, name: "神武门", desc: "紫禁城北门，历史上皇后选秀入宫之处" }
]

Page({
  data: {
    swiperImages: [
      'https://via.placeholder.com/750x400/6B8E5A/FFFFFF?text=宫殿一',
      'https://via.placeholder.com/750x400/8B6914/FFFFFF?text=宫殿二',
      'https://via.placeholder.com/750x400/4A7A3A/FFFFFF?text=宫殿三'
    ],
    allBuildings: BUILDINGS,
    displayBuildings: BUILDINGS,
    total: BUILDINGS.length,
    mode: 'all'  // all | half | collapse
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
