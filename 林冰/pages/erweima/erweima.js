// pages/erweima/erweima.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    position: '',
    company: '',
  },
  shouye: function () {
    wx.navigateTo({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var form_data = wx.getStorageSync('form');
    console.log(form_data);
    this.setData({
      name: form_data.name,
      position: form_data.position,
      company: form_data.company,
    
    })

    wx.request({
      url: app.ReqUrl+'user/search',
      data: {
        openid_key: app.openid_key,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + app.Cookie + ';path=/'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: res => {
        this.setData({
          // name: res.data.data.name,
          // pos: res.data.data.position,
          // company: res.data.data.company,
          // 传头像
          // avatarUrl: options.avatarUrl,
          // qr: that.data.imgIP + data.qr,
          // card: that.data.imgIP + data.card,
        })
        console.log('成功传回数据');
        console.log(res.data)
      }
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