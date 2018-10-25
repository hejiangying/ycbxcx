// pages/shopping/checkout/checkout.js
const toolkit = require('../../../utils/ToolKit.js');
const api = require('../../../utils/api.js');
const host = require('../../../utils/host.js');
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

  },
  chooseAddress: function () {
    let checkedAddressId = this.data.checkedAddress.id
    let url = ''
    if (checkedAddressId) {
      url = '/pages/buy/address/address'
    }else {
      url = '/pages/buy/address/address'
    }
    wx.navigateTo({
      url: url,
    })
  },
  submitOrder: function () {
    var addressId = wx.getStorageSync('addressId'),
    token=wx.getStorageSync('token'),
      url = api.pay.payall + '?ids=' + goodsid + '&token=' + token + '&addressId=' + addressId + '&paymentType=' + 1 +'&postFee='+0;
    console.log("addressId", addressId)
    if (addressId != ''){
      toolkit.post(url, (res) => {
        wx.removeStorageSync('addressId')
        console.log('需要清除addressId', addressId)
        var orderNo = res.data.result.orderNo
        wx.requestPayment({
          'timeStamp': res.data.result.timeStamp,
          'nonceStr': res.data.result.nonceStr,
          'package': res.data.result.package,
          'signType': res.data.result.signType,
          'paySign': res.data.result.paySign,
          'success': function (res) {
            console.log('支付：', res)
            if (res.errMsg == 'requestPayment:ok') {
              var update = api.buy.updateList + '?token=' + token + '&orderNo=' + orderNo
              toolkit.post(update, (res) => {
                console.log('支付成功', res)
                wx.showToast({
                  title: '支付成功',
                  duration: 2000
                })
              })

            }
          },
          'fail': function (res) {
            if (res.errMsg == 'requestPayment:fail cancel') {
              wx.showToast({
                title: '支付失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      })
      wx.removeStorageSync('addressId')
    }else{
      wx.showToast({
        title: '请选择收货地址',
      })
    }
      
   
  }
})