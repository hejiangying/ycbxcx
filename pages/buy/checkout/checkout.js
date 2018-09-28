// pages/shopping/checkout/checkout.js
const toolkit = require('../../../utils/ToolKit.js');
const api = require('../../../utils/api.js');
var goodsid = '', totalPrice=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkedAddress: {},
    couponId: '',
    couponName: '',
    couponCount: 1,
    couponPrice: '',
    checkedGoodsList: [],
    totalPrice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("opyions",options)
    goodsid = options.ids
    wx.setNavigationBarTitle({
      title: '确认订单'
    })
  },
  //获取购买数据
  getGooddetail(){
    var that = this,
    token = wx.getStorageSync('token'),
      url = api.shop.shopInfo + '?token=' + token + '&ids=' + goodsid;
      toolkit.post(url,(res)=>{
        totalPrice=0;
        var checkedGoodsList = res.data.result
        for (var i = 0; i < checkedGoodsList.length; i++) {
          console.log(i, checkedGoodsList[i].goodsPrice, checkedGoodsList[i].goodsNumber)
          totalPrice += (checkedGoodsList[i].goodsPrice * 100 * checkedGoodsList[i].goodsNumber) / 100
          console.log(i, totalPrice)
        }
        that.setData({
          checkedGoodsList: checkedGoodsList,
          totalPrice: totalPrice
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
    that.getGooddetail()
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

  },
  chooseAddress: function () {
    let checkedAddressId = this.data.checkedAddress.id
    console.log("checkedAddressId0000", checkedAddressId)
    let url = ''
    if (checkedAddressId) {
      url = '/pages/buy/address/address'
    }else {
      url = '/pages/buy/address/address'
    }
    console.log("checkedAddressId", checkedAddressId)
    wx.navigateTo({
      url: url,
    })
  },
  submitOrder: function () {
    var addressId=wx.getStorageSync('addressId'),
    token=wx.getStorageSync('token'),
      url = api.pay.payall + '?ids=' + goodsid + '&token=' + token + '&addressId=' + addressId + '&paymentType=' + 1 +'&postFee='+0;
      toolkit.post(url,(res)=>{
        wx.requestPayment({
          'timeStamp': res.data.result.timeStamp,
          'nonceStr': res.data.result.nonceStr,
          'package': res.data.result.package,
          'signType': res.data.result.signType,
          'paySign': res.data.result.paySign,
          'success': function (res) { },
          'fail': function (res) { }
        })
      })
   
  }
})