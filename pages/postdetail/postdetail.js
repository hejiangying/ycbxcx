// pages/postdetail/postdetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var postId = '',index='',replyId='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLike:false,//默认未点赞
    att_status:false,//默认未关注
    postdetail:'',//帖子详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    postId = options.id
    console.log("postid:",postId)
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
  goComment:function(e){
    var commid = e.currentTarget.dataset.commid;
    wx.navigateTo({
      url: '../../pages/quiz/quiz?id='+commid +'&index='+1,
    })
  },
  //回复
  commClick:function(e){
    var replyid = e.currentTarget.dataset.replyid;
    console.log("replyid:",replyid)
    wx.navigateTo({
      url: '../../pages/quiz/quiz?replyid=' + replyid+'&index='+2,
    })
  },
  getpostDetail: function () {
    var that = this,
      token = wx.getStorageSync('token'),
      id = postId,
      url = api.post.postDetail + '?id=' + id + '&token=' + token;
    toolkit.get(url, (res) => {
      var postdetail = res.data.result
      console.log('postdetail:', postdetail)
      // console.log(postdetail.commentList.length)
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