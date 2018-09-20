// pages/fooddetail/fooddetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var goodsId = '',houseid = '',
  itemId = ''; //商品id
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
    seindex:'',
    houseDetail:'',
    iscol: false, //默认不收藏该商品

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
      wx.hideLoading()
      var goodsimg = goods.litpic;
      // var reg = /,$/gi;
      // var img = goodsimg.replace(reg, '')
      // var imgres = img.split(",")
      that.setData({
        goods: goods,
        houselist: houselist
        // imgres: imgres
      })
    })
  },
  // 是否收藏该商品
  isCollect: function () {
    var that = this,
      _iscol = "";
    if (that.data.iscol == false) {
      _iscol = true
    } else {
      _iscol = false
    }
    that.setData({
      iscol: _iscol
    })
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
    var status = that.data.status
    if (status == false) {
      that.setData({
        status: true
      })
    } else {
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

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("option:", options)
    goodsId = options.id
    itemId = options.itemId
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