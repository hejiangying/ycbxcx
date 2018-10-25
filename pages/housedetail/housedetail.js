// pages/fooddetail/fooddetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var goodsId = '',houseid = '',
  itemId = '', collectStatus='',price=''; //商品id,房间id，住宿标识，收藏状态,价格
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xc: 1, //默认选择行程介绍
   
    _type: '',
    goods: '',
    goodsimg: [],
    imgres: [],
    houselist:[],
    commentlist:[],
    seindex:'',
    houseDetail:'',
    collectstatus:''
  },
  xcSelect: function(e) {
    var that = this;
    var _xc = e.currentTarget.dataset.xc
    that.setData({
      xc: _xc
    })
  },
 
  closeClick: function() {
    var that = this;
    var status = that.data.status
    that.setData({
      status: false
    })

  },
  //获取商品详情
  getgoodsdetail: function() {
    var that = this,token=wx.getStorageSync('token');
    wx.showLoading({
      title: '正在加载...',
    })
    var url = api.appHotel.housedetail + '?id=' + goodsId+'&token='+token;
    toolkit.get(url, function(res) {
      var goods = res.data.result.hotel
      var houselist = res.data.result.hotelRoomList
      var commentlist = res.data.result.commentList
      collectStatus = res.data.result.collectStatus
      wx.hideLoading()
      var goodsimg = goods.litpic;
      that.setData({
        goods: goods,
        houselist: houselist,
        commentlist: commentlist,
        collectstatus: collectStatus
      })
    })
  },
  // 是否收藏该商品
  isCollect: function (e) {
    console.log(e)
    console.log('zahungtai', collectStatus)
    var that = this,
      productId = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      collentUrl = that.route;
      if(token != ''){
        if (collectStatus == 0) {
          var url = api.collection.save + '?productId=' + productId + '&token=' + token + '&collentUrl=' + collentUrl + '&recType=' + itemId;
          toolkit.post(url, (res) => {
            console.log("收藏成功")
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
            console.log("取消收藏")
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
          icon:'none'
        })
      }
   
  },
  //点击出现详情
  orderClick(e) {
    houseid = e.currentTarget.dataset.houseid
    var that = this;
    var status = that.data.status;
    var url = api.appHotel.houseDetail+'?id='+houseid
    toolkit.get(url,(res)=>{
     var houseDetail = res.data.result
     var price = res.data.result.price
     wx.setStorageSync('price', price)
      console.log("housedetail:", houseDetail)
      that.setData({
        status: !status,
        houseDetail: houseDetail
      })
    })
  },
  
  //立即预订
  buyClick: function () {
    var that = this;
    var status = that.data.status,token = wx.getStorageSync('token');
    if (status == false) {
      that.setData({
        status: true
      })
    } else if(token != ''){
      // if (that.data._type == '') {
      //   wx.showToast({
      //     title: '请选择款式',
      //     icon: 'none'
      //   })
      // } else {
      that.setData({
        status: false
      })
      wx.navigateTo({
        url: '/pages/kezhan/kezhan?houseid=' + houseid + '&itemid=' + itemId + '&goodsid=' + goodsId,
      })
      // }

    }else{
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("option:", options)
    goodsId = options.id
    if (options.recType){
      itemId = options.recType
    }else{
      itemId = options.itemId
    }
   
  },
  commSee(){
    var that = this;
    wx.navigateTo({
      url: '../../pages/comments/comments?id=' + goodsId + '&itemid=' + itemId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    that.getgoodsdetail()
    that.setData({
      host:host
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})