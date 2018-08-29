// pages/orderdetail/orderdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xc:1,//默认选择行程介绍
    iscol:false//默认不收藏该商品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 行程、费用及使用的选择
  xcSelect:function(e){
    var that = this;
    var _xc = e.currentTarget.dataset.xc
    that.setData({
      xc:_xc
    })
  },
  // 是否收藏该商品
  isCollect:function(){
    var that = this ,_iscol ="";
    if(that.data.iscol == false){
      _iscol = true
    }else{
      _iscol = false
    }
    that.setData({
      iscol:_iscol
    })
  },
// 查看评论
  commSee:function(){
    wx.navigateTo({
      url: '../../pages/comments/comments',
    })
  },
  buyClick:function(){
    wx.navigateTo({
      url: '../../pages/booking/booking',
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