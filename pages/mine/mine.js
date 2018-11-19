// pages/mine/mine.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myinfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  getInfo:function(){
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.apiUser.info + '?token=' + token;
      toolkit.post(url,(res)=>{
        wx.stopPullDownRefresh()
        var myinfo = res.data.result
        that.setData({
          myinfo:myinfo
        })
      })
  },
  // 修改个人信息
  changeInfo(){
    wx.navigateTo({
      url: '../../pages/changeinfo/changeinfo',
    })
  },
  // 跳转我的关注页面
  goAtt:function(){
    wx.navigateTo({
      url: '../../pages/myattention/myattention',
    })
  },
  // 跳转我的粉丝页面
  seeFans:function(){
    wx.navigateTo({
      url: '../../pages/myfans/myfans',
    })
  },
  // 跳转我的帖子页面
  seePost:function(){
    wx.navigateTo({
      url: '../../pages/mypost/mypost',
    })
  },
  // // 跳转个人资料页面
  // seeInfo:function(){
  //   wx.navigateTo({
  //     url: '../../pages/myinfo/myinfo',
  //   })
  // },
  // 跳转到用户协议
  helpClick:function(){
    wx.navigateTo({
      url: '../../pages/buy/address/address',
    })
  },
  //跳转到优惠券页面
  couponClick:function(){
    wx.navigateTo({
      url: '../../pages/coupon/coupon',
    })
  },
  //跳转到收藏页面
  scClick(){
    wx.navigateTo({
      url: '../../pages/collection/collection',
    })
  },
  // 跳转到我的购物车
  aboutClick:function(){
    wx.navigateTo({
      url: '../../pages/shopping/shopping',
    })
  },
  loginClick(){
    wx.navigateTo({
      url: '/pages/wxis/wxis',
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
    that.getInfo()
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
    that.getInfo()
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