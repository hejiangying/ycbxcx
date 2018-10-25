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
    console.log('666',e)
    var openid = wx.getStorageSync('openid')
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
             var myid = res.data.result.member.id
             wx.setStorageSync('myid', myid)
             wx.setStorageSync('token', res.data.result.token)
          }
        )
      wx.switchTab({
        url: '../../pages/index/index',
      })
    } else if (e.detail.errMsg == 'getUserInfo:fail auth deny'){
      // wx.showToast({
      //   title: '请授权后再访问小程序',
      //   icon: 'none',
      // })
      //  this.getSetting();
      wx.switchTab({
        url: '../../pages/index/index',
      })
     }
  },
  // getSetting: function (e) {
  //   console.log('333',e)
  //   wx.openSetting({
  //     success: res => {
  //       if (res.authSetting["scope.userInfo"] == true) {
  //         auth.login(this.data.url);
  //       } else {
  //         this.getSetting();
  //       }
  //     }
  //   });
  // },

})