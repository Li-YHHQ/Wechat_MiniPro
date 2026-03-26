Component({
  data: { selected: 0 },
  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index
      const path = e.currentTarget.dataset.path
      this.setData({ selected: index })
      wx.switchTab({ url: path })
    }
  }
})
