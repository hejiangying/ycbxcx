const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
Page({
  data: {
    lineList:'',
    goodsList:'',
    hotelList:''
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
    that.gethome()
  },
  gethome(){
    var that = this,
    url=api.home.home;
    toolkit.get(url,(res)=>{
      var goodsList = res.data.result.goodsList
      var hotelList = res.data.result.hotelList
      var lineList = res.data.result.lineList
      that.setData({
        goodsList: goodsList,
        hotelList: hotelList,
        lineList: lineList
      })
    })
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
      url: '../../pages/tourroute/tourroute?itemId='+2
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
      url: '../../pages/foodclass/foodclass?itemId='+0,
    })
  },
  goanother:function(){
    wx.navigateTo({
      url: '../../pages/food/food?itemId=' + 3,
    })
  },
  gohouse:function(){
    wx.navigateTo({
      url: '../../pages/houselist/houselist?itemId=' + 1,
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
