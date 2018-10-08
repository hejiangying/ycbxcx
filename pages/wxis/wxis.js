const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = decodeURIComponent(options.url);
    this.setData({
      url: url
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    var openid = wx.getStorageSync('openid')
    console.log("openid000000000",openid)
    if (e.detail.errMsg == 'getUserInfo:ok') {
      toolkit.post(api.apiUser.get_union,
          {
            openid: openid,
            userInfo: e.detail.userInfo,
            rawData: e.detail.rawData,
            signature: e.detail.signature,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          },
          function (res) {
            console.log("res1111:", res)
             var myid = res.data.result.user.id
             wx.setStorageSync('myid', myid)
             wx.setStorageSync('token', res.data.result.token)
          }
        )
      wx.switchTab({
        url: '../../pages/index/index',
      })
     } else {
      wx.showToast({
        title: '请授权后再访问小程序',
        image:'../../image/clear.png'
      })
       this.getSetting();

     }
  },
  getSetting: function (e) {
    wx.openSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"] == true) {
          auth.login(this.data.url);
        } else {
          this.getSetting();
        }
      }
    });
  },

})