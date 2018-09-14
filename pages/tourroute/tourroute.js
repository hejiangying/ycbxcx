// pages/tourroute/tourroute.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var itemId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _way:1,
    linelist:[],//自助游路线列表
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
  goDetail:function(e){
    console.log("e:",e)
    var that = this;
    var lineid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/orderdetail/orderdetail?id=' + lineid +'&itemId=' +itemId,
    })
  },
  getLine:function(){
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    var url = api.appLine.linelist;
    toolkit.get(url,(res)=>{
      wx.hideLoading()
      console.log("res444:",res)
      var linelist = res.data.result.content
      console.log("555:",linelist)
      that.setData({
        linelist:linelist
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