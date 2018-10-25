// pages/comments/comments.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var goodsId = '', itemid='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comm:1,
    commentlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsId = options.id;
    itemid = options.itemid;
  },
  commClick:function(e){
    var that = this;
    var _comm = e.currentTarget.dataset.comm
    console.log(_comm)
    that.setData({
      comm:_comm
    })
  },
  getcomm(){
    var that = this, token = wx.getStorageSync('token');
    wx.showLoading({
      title: '正在加载...',
    })
    var url = api.comment.commlist + '?goodsId=' + goodsId + '&token=' + token + '&recType=' + itemid;
    toolkit.post(url, function (res) {
      var commentlist = res.data.result
      console.log("commentlist", commentlist)
      wx.hideLoading()
      that.setData({
        commentlist:commentlist
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
    that.getcomm()
    that.setData({
      host:host
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