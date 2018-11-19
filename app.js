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
       toolkit.post(api.apiUser.onLogin,{code:code},function(res){
         console.log("res:",res)
         var openid = res.data.result.openId;
         wx.setStorageSync('openid', openid);
         console.log('openid:', wx.getStorageSync('openid'))
         var session_key = res.data.result.session_key;
          // that.getAuthorize(openid, session_key);
       })
     }
   })
  },
  onShow: function () {
    console.log("app.js ---onShow---");
    
    var expriation = wx.getStorageSync("index_date")
    var timestamp = Date.parse(new Date());//拿到现在时间
    console.log('存下的时间：', expriation)
    console.log("现在的时间：", timestamp)
    if (expriation < timestamp) {//过期了，清空缓存，跳转到登录
      console.log("缓存已过期");
      wx.clearStorageSync('token');//清空缓存
      return;
    }
  },
  onHide: function () {
    console.log("app.js ---onHide---");
  },
  onError: function (msg) {
    console.log("app.js ---onError---" + msg);
  }
})