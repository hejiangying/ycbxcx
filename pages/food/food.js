// pages/food/food.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var itemid = '', currentPage=1,totalpage='',sumList=[],isLoadmore=false;//通用商品标识，当前页，总页数，总列表，是否加载更多
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist:[],
    id:'',
    imgList:[],
    imglist:[],//封面
    inputcon: '',//搜索内容
    searchList: '',//搜索结果
    typeclass: 1,//1为列表，2为搜索
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    itemid = options.itemId
  },
  //查看详情
  foodClick:function(e){
    var id = e.currentTarget.dataset.id;
    console.log("555", id)
    var that = this;
    wx.navigateTo({
      url: '../../pages/anotherfood/anotherfood?id=' + id + '&itemid=' + itemid,
    })
  },
  //获取输入的内容
  getcon(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      inputcon: e.detail.value
    })
  },
  //搜索
  searchClick() {
    var that = this;
    var goodsName = that.data.inputcon, url = api.appGoods.another + '?goodsName=' + goodsName;
    toolkit.get(url, (res) => {
      var searchList = res.data.result.content
      that.setData({
        searchList: searchList,
        foodList: '',
        typeclass: 2
      })
    })
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
    that.getgoods()
    that.setData({
      host:host
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  //获取商品列表
  getgoods: function () {
    var that = this,
      params = {
        token: wx.getStorageSync('token'),
        pageNumber:currentPage
      };
      wx.showLoading({
        title: '加载中...'
      })
    console.log('api.appGoods.another,', api.appGoods.another)
    toolkit.get(api.appGoods.another, params, (res)=> {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      var goodslist = res.data.result.content;
      totalpage = res.data.result.totalPages
      if(isLoadmore==true){
        sumList = sumList.concat(goodslist)
      }else{
        sumList = goodslist
      }
      that.setData({
        goodslist: sumList
      })
    })

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
    var that = this;
    isLoadmore=false
    currentPage=1
    that.getgoods()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(currentPage != totalpage){
      currentPage++
      isLoadmore=true
      that.getgoods
    }else{
      wx.showLoading({
        title: '没有更多了',
        success:()=>{
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