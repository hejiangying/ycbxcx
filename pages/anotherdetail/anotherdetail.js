// pages/anotherdetail/anotherdetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var goodsid = '',itemid='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordersn:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    goodsid = options.id;
    itemid = options.itemid
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
    that.getDetail()
    that.setData({
      host:host
    })
  },
  getDetail() {
    wx.showLoading({
      title: '正在加载...'
    })
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.order.orderdetail + '?id=' + goodsid + "&token=" + token;
    toolkit.post(url, (res) => {
      wx.hideLoading()
      var orderdetail = res.data.result.ordersItemList
      var ordersn = res.data.result.orderSn
      console.log(res)
      that.setData({
        orderdetail: orderdetail,
        ordersn:ordersn
      })
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