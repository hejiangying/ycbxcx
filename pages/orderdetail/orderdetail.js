

// pages/orderdetail/orderdetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var lineid = '', collectStatus = '', itemId='',price='';//线路id,是否收藏，自助游标识,价格
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xc:1,//默认选择行程介绍
    collectstatus:'',//默认不收藏该商品
    linedetail:'',//线路详情
    commentlist:[],
    goodscomm:'',
    time:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   lineid = options.id
   console.log('111:',options)
   if(options.recType){
     itemId = options.recType
   }else{
    itemId = options.itemId
   }
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
//立即预订
  buyClick:function(){
    var token = wx.getStorageSync('token')
    console.log(lineid)
    if(token != ''){
      wx.navigateTo({
        url: '../../pages/booking/booking?lineid=' + lineid + '&price=' + price,
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
    
  },
  getLinedetail:function(){
    var that = this,token=wx.getStorageSync('token');
    console.log('222:', lineid)
    var url = api.appLine.linedetail + '?id=' + lineid+'&token='+token;
    toolkit.get(url ,(res)=>{
      console.log("线路详情：",res)
      var linedetail = res.data.result.line, commentlist = res.data.result.commentList;
        collectStatus = res.data.result.collectStatus;
        price = linedetail.price
        var goodscomm = res.data.result
      var time = res.data.result.comment.createTime
      console.log('TIME,',time)
      // var newt = newtime.splice(0, 10)
     
      that.setData({
        linedetail:linedetail,
        collectstatus: collectStatus,
        commentlist: commentlist,
        goodscomm: goodscomm,
        // time: newt
      })
    })
  },
  // 是否收藏该商品
  isCollect: function (e) {
    var that = this, productId=e.currentTarget.dataset.id,token=wx.getStorageSync('token'),collentUrl=that.route;
    if(token != ''){
      if (collectStatus == 0) {
        var url = api.collection.save + '?productId=' + productId + '&token=' + token + '&collentUrl=' + collentUrl + '&recType=' + itemId;
        toolkit.post(url, (res) => {
          wx.showToast({
            title: '收藏成功',
          })
          that.setData({
            collectstatus: 1
          })
        })
        collectStatus = 1
      } else if (collectStatus == 1) {
        var reurl = api.collection.remove + '?productId=' + productId + '&token=' + token;
        toolkit.post(reurl, (res) => {
          wx.showToast({
            title: '取消成功',
          })
          that.setData({
            collectstatus: 0
          })
        })
        collectStatus = 0
      }
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
    
  },
  //查看商家
  storeClick(e){
    var storeId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/store/store' + '?storeId=' + storeId,
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
    that.getLinedetail();
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