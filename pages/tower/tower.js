// pages/tower/tower.js
const BUILDINGS = [
  { id: 201, name: "午门城楼", desc: "紫禁城正门城楼，五凤楼之称，气势磅礴", img: "https://picsum.photos/120/120?random=11" },
  { id: 202, name: "角楼", desc: "九梁十八柱七十二条脊，造型精巧绝伦", img: "https://picsum.photos/120/120?random=12" },
  { id: 203, name: "神武门", desc: "紫禁城北门，宫廷生活的重要通道", img: "https://picsum.photos/120/120?random=13" },
  { id: 204, name: "东华门", desc: "紫禁城东门，文武大臣出入之所", img: "https://picsum.photos/120/120?random=14" },
  { id: 205, name: "西华门", desc: "紫禁城西门，内廷与外界的连接", img: "https://picsum.photos/120/120?random=15" }
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
    mode: 'all'
  },

  onLoad() {
    this.setData({ displayList: this.data.allList })
  },

  handleExpand() {
    this.setData({ displayList: this.data.allList, mode: 'all' })
  },

  handleHalf() {
    const half = Math.ceil(this.data.allList.length / 2)
    this.setData({ displayList: this.data.allList.slice(0, half), mode: 'half' })
  },

  handleCollapse() {
    this.setData({ displayList: this.data.allList.slice(0, 2), mode: 'collapse' })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` })
  }
})
