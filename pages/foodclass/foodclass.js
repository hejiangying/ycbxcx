// pages/footclass/foodclass.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var itemId ='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:'',//食品分类
    goodsList:'',//分类情况
    isChecked:''
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
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getfoodList()
    that.getList()
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
        foodList:foodList
      })
    })
  },
  //分类加载每一项
  classcLick:function(e){
    var that = this;
    var catId = e.currentTarget.dataset.id,
      url = api.appGoods.goodsItem + '?catId=' + catId;
      wx.showLoading({
        title: '数据加载中...',
      })
    toolkit.get(url,(res)=>{
      wx.hideLoading()
      var goodsList = res.data.result.content
      that.setData({
        goodsList: goodsList,
        isChecked: catId,
        foodList: that.data.foodList
      })
    })
  },
  //加载全部商品
  allGood:function(){
    var that = this;
    that.getList()
  },
  //加载全部商品
  getList:function(){
    var that = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    toolkit.get(api.appGoods.goodsItem,(res)=>{
      wx.hideLoading()
      var goodsList = res.data.result.content
      that.setData({
        goodsList: goodsList
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})