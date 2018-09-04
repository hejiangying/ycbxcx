const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    wx.getSetting({
      success:function(res){
        console.log("authSetting", res)
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:function(res){
              console.log("user:",res)
            }
          })
        }else{
          wx.navigateTo({
            url: '../../pages/wxis/wxis',
          })
        }

      }
    })
   
  },
  onShow:function(){
    var that = this;
  },
 
  // 跳转搜索页
  goSearch:function(){
    wx.navigateTo({
      url:"../../pages/search/search"
    })
  },
  moreClick:function(){
    wx.navigateTo({
      url: '../../pages/moreroute/moreroute',
    })
  },
  // 跳转旅游路线页面
  gotour:function(){
    wx.navigateTo({
      url: "../../pages/tourroute/tourroute"
    })
  },
  //跳转定制旅游页面
  gocustom:function(){
    wx.navigateTo({
      url: '../../pages/custom/custom',
    })
  },
  //跳转美食列表
  gofood:function(){
    wx.navigateTo({
      url: '../../pages/food/food',
    })
  },
  gohouse:function(){
    wx.navigateTo({
      url: '../../pages/houselist/houselist',
    })
  },
  // 跳转订单详情页
  goBuy:function(){
    wx.navigateTo({
      url: "../../pages/orderdetail/orderdetail"
    })
  },
  goShop:function(){
    wx.navigateTo({
      url: '../../pages/shopping/shopping',
    })
  },
  

  onShareAppMessage:function(){

  }
  
})
