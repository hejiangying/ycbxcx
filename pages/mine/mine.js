// pages/mine/mine.js
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
    var that = this;
    var myinfo = wx.getStorageSync('userInfo');
    console.log("111:", myinfo)
    that.setData({
      myinfo:myinfo
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
  // 跳转个人资料页面
  seeInfo:function(){
    wx.navigateTo({
      url: '../../pages/myinfo/myinfo',
    })
  },
  // 跳转到用户协议
  helpClick:function(){
    wx.navigateTo({
      url: '../../pages/help/help',
    })
  },
  // 跳转到关于我们页面
  aboutClick:function(){
    wx.navigateTo({
      url: '../../pages/about/about',
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