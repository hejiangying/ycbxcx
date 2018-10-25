// pages/mypost-comm/mypost-comm.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var postId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postdetail:'',//帖子详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     postId = options.id
    console.log(options)
  },
  getpostDetail:function(){
    var that =this,
    token = wx.getStorageSync('token'),
    id = postId,
    url = api.post.postDetail + '?id=' + postId + '&token=' + token;
    toolkit.get(url,(res)=>{
      var postdetail = res.data.result
      console.log('postdetail:',postdetail)
      that.setData({
        postdetail: postdetail
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
    that.getpostDetail()
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