//app.js
const toolkit = require('utils/ToolKit.js');
const api = require('utils/api.js');
App({
 
  onLaunch: function (options) {
   var that  = this;
   wx.login({
     success:function(login){
       console.log("login:",login)
       var code = login.code;
       console.log("api.user.onLogin:", api.apiUser.onLogin)
       toolkit.post(api.apiUser.onLogin,{code:code},function(res){
         console.log("res:",res)
         var openid = res.data.result.openId;
         wx.setStorageSync('openid', openid);
         console.log('openid:', wx.getStorageSync('openid'))
         var session_key = res.data.result.session_key;
          that.getAuthorize(openid, session_key);
       })
     }
   })
  },
  getAuthorize: function (openid, session_key) {
    var that = this;
    console.log("获取用户信息：", api.apiUser.get_union)
    wx.getUserInfo({
      withCredentials: true,
      success: function (user) {
        console.log('wx.getUserInfo:', user)
        wx.setStorageSync('userInfo', user.userInfo);
        wx.setStorageSync('authorize', 0)
       
        toolkit.post(api.apiUser.get_union,
          {
            openid: openid,
            session_key: session_key,
            userInfo: user.userInfo,
            rawData: user.rawData,
            signature: user.signature,
            encryptedData: user.encryptedData,
            iv: user.iv
          },
          function (res) {
            console.log("res:", res)
             wx.setStorageSync('token', res.data.result.token)
          }
        )
      },
      fail: function (res) {
        console.log('拒绝授权')
        wx.setStorageSync('authorize', 1)
      }
    })
  },
 
})