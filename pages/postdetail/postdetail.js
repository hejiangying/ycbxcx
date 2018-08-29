// pages/postdetail/postdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike:false,//默认未点赞
    att_status:false//默认未关注
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 点赞和取消点赞
  likeClick: function (e) {
    var that = this, _isLike, _likenum;
    var llike = that.data.likenum;
    if (that.data.isLike == false) {
      _isLike = true
      _likenum = ++llike
    } else {
      _isLike = false
      _likenum = --llike
    }
    that.setData({
      isLike: _isLike,
      likenum: _likenum
    })

  },

// 关注和取消关注
  attenClick:function(e){
    var that = this,status;
    if(that.data.att_status == false){
      console.log("that.data.att_status:", that.data.att_status)
      status = true
    }else{
      status = false
    }
    that.setData({
      att_status:status
    })
  },
  //跳转到评论页面
  goComment:function(){
    wx.navigateTo({
      url: '../../pages/quiz/quiz',
    })
  },
  commClick:function(e){
    wx.navigateTo({
      url: '../../pages/quiz/quiz',
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