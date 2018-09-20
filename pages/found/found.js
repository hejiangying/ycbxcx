// pages/found/found.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var needLoadMore = false, currentPage=1,totalpage='';//是否需要上拉加载数据,当前页,总页数，
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _add:false,//悬浮按钮默认为加号
    est:1    ,//默认显示最热
    isLike: false,//默认未点赞
    likenum:1,//点赞人数
    postList:[],//帖子列表
    myId:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("options")
  },
  // 悬浮按钮展开判断
  addClick:function(){
    var that = this;
    that.setData({
      _add:(!that.data._add)
    })

  },
  // 最新最热和关注的切换
  estClick:function(e){
    var that = this;
    var _est = e.currentTarget.dataset.est;
    that.setData({
      est:_est
    })
  },
  // 跳转到发布帖子页面
  goPost:function(){
    wx.navigateTo({
      url: '../../pages/post/post',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 跳转到消息详情页面
  replyClick:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/postdetail/postdetail?id='+ id,
    })
  },
  // 点赞取消点赞
  likeClick:function(e){
    var that = this,_isLike,_likenum;
    var llike = that.data.likenum;
    if(that.data.isLike == false){
     _isLike = true
      _likenum = ++llike
    }else{
      _isLike = false
      _likenum = --llike
    }
    that.setData({
      isLike:_isLike,
      likenum:_likenum
    })

  },
  closeNews(e){
    var that = this,
    postid = e.currentTarget.dataset.postid,
    token=wx.getStorageSync('token'),
    url = api.post.postDel+'?id='+postid+'&token='+token;
    wx.showModal({
      title:'提示',
      content:'是否确定删除该帖子',
      confirmColor:'#f63264',
      success:(res)=>{
        if(res.confirm){
          console.log('用户点击确定')
          toolkit.post(url,(res)=>{
            that.getpostList()
          })
        } else if (res.cancel){
          console.log('用户点击取消')
        }
      }
    })
    
  },
  //获取帖子列表
  getpostList: function () {
    var that = this,
      params = {
        token: wx.getStorageSync('token')
      },
      url = api.post.postList;
      var myid = wx.getStorageSync('myid')
    toolkit.get(url, params, (res) => {
      console.log("帖子列表：", res)
      var postList = res.data.result.content;
      totalpage = res.data.result.totalPages
      if(postList.length >9){
        needLoadMore = true
      }else{
        needLoadMore = false
      }
      that.setData({
        postList: postList,
        myId:myid
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
    that.getpostList()
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
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    if (needLoadMore = true && currentPage != totalpage){
      currentPage++
      that.getpostList()
      wx.hideLoading();
    }else{
      wx.showLoading({
        title:'没有更多了',
        icon:'none',
        success:function(){
          wx.hideLoading();
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