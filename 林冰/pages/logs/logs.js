//logs.js
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    imgs: [],
    input_code: "请点击右方按钮选择",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
   input_name:"请输入姓名"
  },
  choose: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],//原图压缩图
      sourceType: ['album', 'camera'],//相册相机
      success: function (res) {
      console.log(res.tempFilePaths)//tmpFilePaths可以作为img标签的src属性显示图片
        that.setData({
          imags: res.tempFilePaths
        
        })
        wx.uploadFile({
          url: app.ReqUrl + 'user/addPhotos',
          filePath: res.tempFilePaths[0],
          name: 'file',
          header: {
            "content-type": "application/x-www-form-urlencoded",
            'Cookie': 'PHPSESSID=' + app.Cookie + ';path=/'

          },
          formData: {
            'openid_key': app.openid_key
          },
          success:res=>{
            console.log(res);
          }

        })
      },
    })
  },
  //获取图片
  chooseImage: function() {
    var that = this;
    var uni=wx.getStorageSync('uni')
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],//原图压缩图
      sourceType: ['album', 'camera'],//相册相机
      success: function(res) {
      console.log(res.tempFilePaths)
      var img=res.tempFilePaths
        var tempFilePaths = new Array(img.length)
      //tmpFilePaths可以作为img标签的src属性显示图片
        var imgs=that.data.imgs.concat(res.tempFilePaths);//连接追加
        that.setData({
          // imgs: res.tempFilePaths
          imgs:imgs
        })
          for(let i = 0; i<tempFilePaths.length;i++){
          wx.uploadFile({
            url: that.data.url + app.ReqUrl + 'user/addPhotos',
    filePath: img[i],
            name: 'upfile',
            formData: {},
            success: function (res) {
              tempFilePaths[i] = res.data
              that.setData({
                tempFilePaths: tempFilePaths
              })
            },
            fail: function (res) {
              // console.log(res)
            },
          })
        }
        that.setData({
          logo: res.tempFilePaths
        })
      }
    })
  },

  //删除图片
  deleteImage: function(e) {
    console.log(e)
    var that = this;
    wx.showModal({
      title: '删除图片',
      content: '确认要删除吗？',
      showCancel: true,
      success: function(res) {
        if (res.cancel == true) {
          wx.showToast({
            title: '已取消',
          })
        } else if (res.confirm == true) {
          var imgId = e.currentTarget.dataset.imgId;
          var imgs = that.data.imgs;
          console.log(imgs)
          imgs.splice(imgId, 1);//张数
          console.log(imgs)
          that.setData({
            imgs: imgs
          })
          wx.showToast({
            title: '删除成功',
          })
        }
      }
    })
  },

  previewImge: function() {
    var that = this;
    var dataid=e.currentTarget.dataset.id;
    var imgs=that.data.imgs;
    //在新页面中全屏预览图片
    wx.previewImage({
      current: 'imgs[dataid]',
      urls: that.data.Img,
    })
  },
  

  //选择地图中其他位置
  chooseLocation: function() {
    var that = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        that.setData({
          address: res.address,
          input_code: ""
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete

      }
    })

  },
//表单传输
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    var warn = "";
    var flag = true;
    // form校验
    if (formData.tel == "") {
      warn = "请填写你的手机号码";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(formData.tel))) {
      warn = "手机号码格式不正确";
    } else if (formData.weixin == "") {
      warn = "请填写你的微信";
    } else if (formData.email == "") {
      warn = "请填写你的邮箱";
    } else {
      flag = false;
      var that = this;
      wx.redirectTo({
        url: '../index/index?tel=' + formData.tel + '&wechat=' + formData.weixin + '&email=' + formData.email + '&address=' + formData.address + '&textarea=' + formData.textarea + '&http=' + formData.http + '&phone=' + formData.phone,
      })
    }
    // 如果信息填写不完整
    if (flag == true) {
      wx.showModal({
        title: '提示',
        content: warn
      })
    }
    // 本地缓存form数据
    wx.setStorage({
      key: 'form',
      data: formData,
    })
    //传输数据到服务器
    wx.request({
      url: app.ReqUrl + 'user/add',
      data: {
        openid_key: app.openid_key,
        name: this.data.userInfo,
        tel: formData.tel,
        company: 0,
        position: 0,
        wechat: formData.wechat,
        email: formData.email,
        addr: formData.address,
        product: formData.textarea,
        http: formData.http,
        phone: formData.phone,
        img_url: 0,
        top_img: 0,
        user_json: JSON.stringify(this.data.userInfo)
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
 

  onLoad: function () {
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})