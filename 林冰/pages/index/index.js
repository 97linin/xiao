//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tel:'',
    wechat:'',
    email:'',
    position:'',
    company:'',
    textarea:'',
    http:'',
    phone:'',
    addrress:'',
   


  },
  //事件处理函数

  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 另一个页面中通过从本地缓存中同步获取指定 key 对应的内容。
    //同步编辑页面的数据
    var form_data = wx.getStorageSync('form');
    console.log(form_data);
    this.setData({
      name:form_data.name,
      position:form_data.position,
      company: form_data.company,
      tel: form_data.tel,
      wechat: form_data.wechat,
      email: form_data.email,
      addrress: form_data.addrress,
      textarea: form_data.textarea,
      http: form_data.http,
      phone: form_data.phone,
   
    })
  },
  log:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  dianhuabu: function () {
    wx.navigateTo({
      url: '../dianhuabu/dianhuabu',
    })
  },
  collect: function () {
    wx.navigateTo({
      url: '../collect/collect?id=' + 0,
    })
  },
  erweima: function () {
    wx.navigateTo({
      url: '../name/name',
    })
  },
  supergroup: function () {
    wx.navigateTo({
      url: '../collect/collect?id=' + 1,
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
