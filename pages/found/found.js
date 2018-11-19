// pages/found/found.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var isLoadmore=false,currentPage = 1, totalpage = '',thumbsStatus='',postlike=[],postsum=[],busy=false;//是否需要上拉加载数据,当前页,总页数，点赞状态，当前帖子数,总帖子数,多次点击导致网络繁忙

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _add:false,//悬浮按钮默认为加号
    isLike: '',//默认未点赞
    likenum:'',//点赞人数
    postList:[],//帖子列表
    myId:'',
    inputcon:'',//输入的内容
    searchList:[],//搜索结果
    typeclass: 1,//1为列表，2为搜索
    searchmask: false
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
    var token = wx.getStorageSync('token'),
    that = this,
      typeId = e.currentTarget.dataset.id;
      if(busy == true){
        return
      }
      busy = true
      for(let i=0; i<postlike.length; i++){
        if(postlike[i].id == typeId){
          if (postlike[i].thumbsStatus == 0){
            var url1 = api.like.like + '?token=' + token + '&typeId=' + typeId
            toolkit.post(url1, (res) => {
            })
            busy = false
          } else if (postlike[i].thumbsStatus == 1){
            var url1 = api.like.removelike + '?token=' + token + '&typeId=' + typeId
            toolkit.post(url1,(res)=>{
            })
            busy = false
          }
        }
      }
    that.getpostList()
  },
  
  //删除
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
    wx.showLoading({
      title: '加载中...',
    })
    var that = this,
      params = {
        token: wx.getStorageSync('token'),
        pageNumber: currentPage
      },
      url = api.post.postList;
      var myid = wx.getStorageSync('myid')
    toolkit.get(url, params, (res) => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      console.log("帖子列表：", res)
      if (res.data.result != null){
        var postList = res.data.result.content;
        postlike = postList;
        totalpage = res.data.result.totalPages
        if (isLoadmore == true) {
          postsum = postsum.concat(postList)
        } else {
          postsum = postList
        }
        that.setData({
          postList: postsum,
          myId: myid,
          typeclass: 1
        })
      }
      
    })

  },
  //获取输入的内容
  getcon(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      inputcon: e.detail.value
    })
  },
  //搜索
  searchClick() {
    var that = this,token=wx.getStorageSync('token');
    var goodsName = that.data.inputcon, url = api.post.postList + '?keyword=' + goodsName+'&token='+token;
    if (goodsName != ''){
      toolkit.get(url, (res) => {
        var searchList = res.data.result.content
        that.setData({
          searchList: searchList,
          foodList: '',
          typeclass: 2,
          searchmask: false
        })
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '搜索内容不能为空',
      })
    }
   
  },
  showClick() {
    var that = this;
    that.setData({
      searchmask: true
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
    busy = false;
    that.getpostList()
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
    var that = this;
    isLoadmore=false
    currentPage = 1
    that.getpostList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载更多")
    var that = this;
    if ( currentPage != totalpage){
      currentPage++
      isLoadmore=true
      that.getpostList()
    }else{
      wx.showLoading({
        title:'没有更多了',
        icon:'none',
        duration:1000,
        success:function(){
          setTimeout(function(){
            wx.hideLoading();
          },3000)
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