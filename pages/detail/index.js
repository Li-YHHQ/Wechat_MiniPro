// pages/detail/index.js
Page({
  data: {
    id: null
  },
  onLoad(options) {
    this.setData({ id: options.id || null })
  }
})
