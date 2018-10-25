// pages/food/food.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var itemId = '',currentPage = 1,totalpage='',sumList=[],isLoadmore=false;//酒店标识，当前页，总页数，总列表,是否加载更多
const host = require('../../utils/host.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houselist: [],
    inputcon: '',//搜索内容
    searchList: '',//搜索结果
    typeclass: 1,//1为列表，2为搜索
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    itemId = options.itemId
  },
  //查看详情
  foodClick: function (e) {
    console.log("客栈id：",e)
    var houseid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/housedetail/housedetail?id=' + houseid + '&itemId=' + itemId,
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
    var keyword = that.data.inputcon, url = api.appHotel.houselist + '?keyword=' + keyword;
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
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this,
      params = {
        token: wx.getStorageSync('token'),
        pageNumber:currentPage
      };
    console.log('api.appHotel.houselist,', api.appHotel.houselist)
    toolkit.get(api.appHotel.houselist, params,  (res) => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      var houselist = res.data.result.content;
      totalpage = res.data.result.totalPages
      if(isLoadmore==true){
        sumList = sumList.concat(houselist)
      }else{
        sumList = houselist
      }
      that.setData({
        houselist: sumList
      })
    },()=>{
        wx.hideLoading()
        wx.showToast({
          title: '网络出错',
          image:'../../image/error.png'
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
    isLoadmore = false
    currentPage = 1
    that.getgoods()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(currentPage != totalpage){
      currentPage++
      isLoadmore =true
      that.getgoods()
    }else{
      wx.showLoading({
        title:'没有更多了',
        success:()=>{
          setTimeout(function(){
            wx.hideLoading()
          },1000)
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