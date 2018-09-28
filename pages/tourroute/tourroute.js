// pages/tourroute/tourroute.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var itemId = '',currentPage=1,totalpage='',sumList=[],isLoadmore=false;//自助游标识，当前页，总页数，总列表,是否加载更多
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _way:1,
    linelist:[],//自助游路线列表
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
  tapSelect:function(e){
    var that = this;
    var tourway = e.currentTarget.dataset.way;
    that.setData({
      _way : tourway
    })

  },
  //查看详情
  goDetail:function(e){
    console.log("e:",e)
    var that = this;
    var lineid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/orderdetail/orderdetail?id=' + lineid + '&itemId=' + itemId,
    })
  },
  //获取列表
  getLine:function(){
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    var url = api.appLine.linelist+'?pageNumber='+currentPage;
    toolkit.get(url,(res)=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log("res444:",res)
      var linelist = res.data.result.content;
      if(isLoadmore == true){
        sumList = sumList.concat(linelist)
      }else{
        sumList = linelist
      }
      totalpage = res.data.result.totalPages
      console.log("555:",linelist)
      that.setData({
        linelist: sumList
      })
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
    var overCity = that.data.inputcon, url = api.appLine.linelist + '?overCity=' + overCity;
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
    that.getLine()
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
    var that = this;
    isLoadmore==false
    currentPage = 1
    that.getLine()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if(currentPage != totalpage){
      currentPage++
      isLoadmore == true
      that.getLine()
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