// pages/orderdetail/orderdetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var lineid = '', collectStatus = '', itemId='';//线路id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xc:1,//默认选择行程介绍
    collectstatus:'',//默认不收藏该商品
    linedetail:'',//线路详情
    commentlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   lineid = options.id
    itemId = options.itemId
   console.log('111:',options)
  },
  // 行程、费用及使用的选择
  xcSelect:function(e){
    var that = this;
    var _xc = e.currentTarget.dataset.xc
    that.setData({
      xc:_xc
    })
  },
  
  // 查看评论
  commSee() {
    var that = this;
    wx.navigateTo({
      url: '../../pages/comments/comments?id=' + lineid + '&itemid=' + itemId,
    })
  },

  buyClick:function(){
    console.log(lineid)
    wx.navigateTo({
      url: '../../pages/booking/booking?lineid=' + lineid,
    })
  },
  getLinedetail:function(){
    var that = this,token=wx.getStorageSync('token');
    console.log('222:', lineid)
    var url = api.appLine.linedetail + '?id=' + lineid+'&token='+token;
    toolkit.get(url ,(res)=>{
      console.log("线路详情：",res)
      var linedetail = res.data.result.line, commentlist = res.data.result.commentList;;
        collectStatus = res.data.result.collectStatus,
        console.log("收藏：",collectStatus)
      that.setData({
        linedetail:linedetail,
        collectstatus: collectStatus,
        commentlist: commentlist
      })
    })
  },
  // 是否收藏该商品
  isCollect: function (e) {
    console.log("jjjjjjjjj",lineid)
    var that = this, productId=e.currentTarget.dataset.id,token=wx.getStorageSync('token'),collentUrl=that.route;
    if (collectStatus ==0){
      var url = api.collection.save + '?productId=' + productId + '&token=' + token + '&price=' + that.data.linedetail.price + '&productName=' + that.data.linedetail.title + '&collentUrl=' + collentUrl;
      toolkit.post(url,(res)=>{
        wx.showToast({
          title: '收藏成功',
        })
        that.setData({
          collectstatus: 1
        })
      })
      collectStatus =1
    } else if (collectStatus == 1){
      var reurl = api.collection.remove + '?productId=' + productId + '&token=' + token;
      toolkit.post(reurl,(res)=>{
        wx.showToast({
          title: '取消成功',
        })
        that.setData({
          collectstatus: 0
        })
      })
      collectStatus = 0
    }
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
    that.getLinedetail();
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