// pages/footclass/foodclass.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var itemId = '', currentPage = 1, totalpage = '',goodssum=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:'',//食品分类
    goodsList:'',//分类情况
    isChecked:'',
    allon:1,//默认全部商品
    inputcon:'',//搜索内容
    searchList:'',//搜索结果
    typeclass:1,//1为列表，2为搜索
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("itemid:",options)
    itemId = options.itemId
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.getfoodList()
    that.getList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  //加载分类列表
  getfoodList:function(){
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    toolkit.get(api.appGoods.goodsClass,(res)=>{
      wx.hideLoading()
      var foodList = res.data.result;
      that.setData({
        foodList:foodList,
        typeclass:1
      })
    })
  },
  //分类加载每一项
  classcLick:function(e){
    var that = this;
    var catId = e.currentTarget.dataset.id,
      url = api.appGoods.goodsItem + '?catId=' + catId;
    toolkit.get(url,(res)=>{
      var goodsList = res.data.result.content
      that.setData({
        goodsList: goodsList,
        isChecked: catId,
        allon:0,
        foodList: that.data.foodList,
        typeclass: 1
      })
    })
  },
  //加载全部商品
  allGood:function(){
    var that = this;
    that.getList()
    that.setData({
      isChecked: '',
      allon:1,
      typeclass: 1
    })
  },
  //加载全部商品
  getList:function(){
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    var url = api.appGoods.goodsItem +'?pageNumber='+currentPage
    toolkit.get(url,(res)=>{
      wx.hideLoading()
      var goodsList = res.data.result.content;
      totalpage = res.data.result.totalPages
      goodssum = goodssum.concat(goodsList)
      that.setData({
        goodsList: goodssum,
        typeclass: 1
      })
    })
  },
  //获取输入的内容
  getcon(e){
    console.log(e.detail.value)
    var that = this;
    that.setData({
      inputcon:e.detail.value
    })
 },
 //搜索
  searchClick(){
    var that = this;
    var goodsName = that.data.inputcon, url = api.appGoods.goodsItem + '?goodsName=' + goodsName;
    toolkit.get(url,(res)=>{
      var searchList = res.data.result.content
      that.setData({
        searchList: searchList,
        foodList:'',
        typeclass: 2
      })
    })
  },
  //商品详情
  foodClick: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    wx.navigateTo({
      url: '../../pages/fooddetail/fooddetail?id=' + id + '&itemId=' + itemId,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("没有更多了")
    var that = this;
    if (currentPage != totalpage) {
      currentPage++
      that.getfoodList()
      that.classcLick()
    }else{
      wx.showLoading({
        title: '没有更多了',
        success(){
          setTimeout(function(){
            wx.hideLoading()
          },3000)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})