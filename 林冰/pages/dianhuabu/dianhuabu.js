
const app = getApp()
Page({
 
   /*页面的初始数据
   */
  data: {
    movies: [
      { url: '/image/image/3.jpg' },
      { url: '/image/image/4.jpg' },
      

    ],
    goods_coverimg:"../../image/0f.jpg",
    dianhualogo:"../../image/dianhua.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.ReqUrl + 'user/searchCollect',
      data: {
        openid_key: app.openid_key,
      },
      header: {

      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + app.Cookie + ';path=/'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
      }
    })
  },
  shouye: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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