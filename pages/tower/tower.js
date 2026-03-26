// pages/tower/tower.js
const BUILDINGS = [
  { id: 201, name: "午门城楼", desc: "紫禁城正门城楼，五凤楼之称，气势磅礴" },
  { id: 202, name: "角楼", desc: "九梁十八柱七十二条脊，造型精巧绝伦" },
  { id: 203, name: "神武门", desc: "紫禁城北门，宫廷生活的重要通道" },
  { id: 204, name: "东华门", desc: "紫禁城东门，文武大臣出入之所" },
  { id: 205, name: "西华门", desc: "紫禁城西门，内廷与外界的连接" }
]

Page({
  data: {
    swiperImages: [
      'https://via.placeholder.com/750x400/8B6914/FFFFFF?text=城楼一',
      'https://via.placeholder.com/750x400/6B8E5A/FFFFFF?text=城楼二',
      'https://via.placeholder.com/750x400/4A5A6A/FFFFFF?text=城楼三'
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
