// pages/first/first.js
// 003049, D62828, F77F00, FCBF49
Page({
  iptHandler(e) { 
    this.setData({
      msg: e.detail.value
    })
  },
  showInput(e) {
    console.log("input", e.detail.value)
  },
  getParam(e) {
    console.log("param", e.target.dataset.info)
  },
  addOne(e) {
    this.setData({
      count: this.data.count + 1
    })

  },
  onButtonTap(e) {
    console.log(e)
  },
  /**
   * 页面的初始数据
   */
  data: {
    userList: [
      {id: 0, name: "yellow"},
      {id: 1, name: "blue"},
      {id: 2, name: "red"},
      {id: 3, name: "green"},
    ],
    array: ["aa", "bb", "cc"],
    type: 2,
    msg: "你好",
    count: 0,
    randomNum: Math.random() * 10,
    info: "init data---------------",
    imgSrc: "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/c4ab05967c9e16d50810e3f7fb9edfb4/Derivates/7d98fd0f7b7d3cd38dfe2041628a880499b05a50.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})