// pages/fukuang/fukuang.js
const app = getApp()
Page({

  data: {

    idx: '0',
    static: ['谁浏览了我', '谁点赞了我'],
    bianhao: '1111111111',
    time: "19:11:11",
    movies: [
      { url: '/image/image/3.jpg' },
      { url: '/image/image/4.jpg' },
     

    ],
  },
  wdmp: function () {
    wx.navigateTo({
      url: '../wdmp/wdmp'
    })
  },
  shouye: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  aaa: function () {
    wx.navigateTo({
      url: '../ddxq/ddxq'
    })
  },
  onLoad: function (options) {
    var t = this;
    wx.getSystemInfo({
      sucess: function (res) {
        console, log(res);
        var windowHeight = e.detail.Height;
        var height = windowHeight;
        t.setData({
          windowHeight: height
        })
      },
    })
  },
  changeStatic: function (res) {
    console.log(res);
    var idx = res.currentTarget.dataset.idx;
    this.setData({
      idx: idx,

    })
  },
  changeSwiper: function (res) {
    var current = res.detail.current;
    this.setData({
      idx: current
    })
  },


  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})