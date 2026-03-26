// pages/palace/palace.js
const BUILDINGS = [
  { id: 1, name: "太和殿", desc: "紫禁城最宏伟的殿宇，皇帝举行大典之所", img: "https://picsum.photos/120/120?random=1" },
  { id: 2, name: "乾清宫", desc: "皇帝日常起居与处理政务的地方", img: "https://picsum.photos/120/120?random=2" },
  { id: 3, name: "御花园", desc: "皇家私家花园，古木参天，奇石异卉", img: "https://picsum.photos/120/120?random=3" },
  { id: 4, name: "角楼", desc: "紫禁城四角的瞭望楼，造型精巧绝伦", img: "https://picsum.photos/120/120?random=4" },
  { id: 5, name: "午门", desc: "紫禁城正门，气势威严", img: "https://picsum.photos/120/120?random=5" },
  { id: 6, name: "神武门", desc: "紫禁城北门，历史上皇后选秀入宫之处", img: "https://picsum.photos/120/120?random=6" }
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

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
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
