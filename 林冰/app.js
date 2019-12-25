
App({
  ReqUrl: 'https://www.leejaz.com/school/school_card/index.php/Home/',
  Cookie: Math.random().toString(36).substr(2),
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.code = res.code;

        wx.request({
          url: that.ReqUrl + 'wxlogin/wxlogin',
          data: {
            code: that.code,
            appid: 'wx5cb60eef43e7e15d',
            appsecret: '1e5696e342fe0d1f16e07d65334f5240'
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=' + that.Cookie + ';path=/'

          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            console.log(res);

            var openid_key = res.data.data.openid_key;
            that.openid_key = openid_key;
            console.log(that.openid_key);
          },
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})