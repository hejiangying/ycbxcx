const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
Page({
  data: {
    lineList:'',
    goodsList:'',
    hotelList:'',
    banner:[],//首页轮播
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
    that.getBanner()
  },
  gethome(){
    var that = this,
    url=api.home.home;
    toolkit.get(url,(res)=>{
      wx.stopPullDownRefresh();
      var goodsList = res.data.result.goodsList.content
      var hotelList = res.data.result.hotelList
      var lineList = res.data.result.lineList
      that.setData({
        goodsList: goodsList,
        hotelList: hotelList,
        lineList: lineList
      })
    })
  },
  getBanner(){
    var that = this;
    toolkit.get(api.home.banner,(res)=>{
      var banner = res.data.result
      that.setData({
        banner:banner
      })
    })
  },
  goBanner(e){
    var that = this,bannerId = e.currentTarget.dataset.id;
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
  //跳转到通用商品
  goanother:function(){
    wx.navigateTo({
      url: '../../pages/food/food?itemId=' + 3,
    })
  },
  //跳转到住宿
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
  goDetail: function (e) {
    console.log("e:", e)
    var that = this;
    var lineid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/orderdetail/orderdetail?id=' + lineid ,
    })
  },
  //客栈
  hotelClick: function (e) {
    console.log("客栈id：", e)
    var houseid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/housedetail/housedetail?id=' + houseid,
    })
  },
  //美食
  foodClick: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.navigateTo({
      url: '../../pages/fooddetail/fooddetail?id=' + id ,
    })
  },
  

  onShareAppMessage:function(){

  },
  onPullDownRefresh: function () {
    var that = this;
    that.gethome()
    that.getBanner()
  },

  
})
