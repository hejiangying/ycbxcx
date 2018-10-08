// pages/shopping/shopping.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
var ids = [];
var currentPage = 1, totalpage = '', sumList = [], isLoadmore = false;//当前页，总页数，总列表数，是否需要加载更多
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartGoods: [],
    checkedGoodsCount: '',
    checkedAllStatus: true,
    totalPrice: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //跳转到下单页面
  goPay: function () {
    wx.navigateTo({
      url: '../../pages/buy/checkout/checkout',
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
    that.getGoods();
  },

  //删除
  delGoods(e) {
    var that = this;
    var goodsid = e.currentTarget.dataset.goodsid,
      token = wx.getStorageSync('token'),
      url = api.shop.delGoods + '?id=' + goodsid + '&token=' + token;
    wx.showModal({
      title: '提示',
      content: '确认删除该商品吗？',
      confirmColor: '#f63264',
      success: (res) => {
        if (res.confirm) {
          toolkit.post(url, (res) => {
            wx.showToast({
              title: '成功删除商品',
            })
            that.getGoods()
          })
        } else if (res.cancel) {
          that.getGoods()
        }
      }
    })

  },
  checkoutOrder: function () {
    wx.navigateTo({
      url: '/pages/buy/checkout/checkout',
    })
  },
  //获取购物车列表
  getGoods: function () {
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.shop.shopList + '?token=' + token+'&pageNumber='+currentPage;
    toolkit.post(url, (res) => {
      wx.stopPullDownRefresh()
      ids=[];
      wx.hideLoading()
      var cartGoods = res.data.result;
      // totalpage = res.data.result.
      if (cartGoods != null) {
        var checkedGoodsCount = cartGoods.length;
        var totalPrice = 0;
        for (var i = 0; i < cartGoods.length; i++) {
          console.log(i, cartGoods[i].goodsPrice, cartGoods[i].goodsNumber)
          totalPrice += (cartGoods[i].goodsPrice * 100 * cartGoods[i].goodsNumber) / 100
          console.log(totalPrice)
          ids.push(cartGoods[i].id)
        }
        console.log('ids', ids)
        that.setData({
          cartGoods: cartGoods,
          checkedGoodsCount: checkedGoodsCount,
          totalPrice: totalPrice.toFixed(2)
        })
      } else {
        that.setData({
          cartGoods: cartGoods,
        })
      }


    })
  },
  //一键结算
  checkoutOrder: function () {
    var that = this;
    wx.navigateTo({
      url: '../../pages/buy/checkout/checkout?ids=' + ids ,
    })
  },
  jieClick(e) {
    var that = this;
    var goodsid = e.currentTarget.dataset.goodsid;
    console.log("iddddddddd", goodsid)
    wx.navigateTo({
      url: '../../pages/buy/checkout/checkout?ids=' + goodsid,
    })
  },
  goClick: function () {
    var that = this;
    wx.navigateBack({
      delta: '1'
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
    that.getGoods()
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