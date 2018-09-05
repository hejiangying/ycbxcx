// pages/shopping/shopping.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cartGoods: [],
    // cartGoods: [{
    //     id: '1',
    //     checked: true,
    //     picUrl: 'http://www.situcms.com/uploads/2018/0726/6ad4175aad9a64e791c68f432331ae45_750x375.jpg',
    //     goodsName: '大理双廊一日游',
    //     spec: '无购物',
    //     number: 1,
    //     goodsPrice: '199.00',
    //     stepper: {
    //       stepper: 1,
    //       min: 1,
    //       max: 50
    //     },
    //   },
    //   {
    //     id: '2',
    //     checked: true,
    //     picUrl: 'http://www.situcms.com/uploads/2018/0726/af10e00f351588219a3db191953d4ac1_750x375.png',
    //     goodsName: '喜洲古镇一日游',
    //     spec: '无购物',
    //     number: 1,
    //     goodsPrice: '179.00',
    //     stepper: {
    //       stepper: 1,
    //       min: 1,
    //       max: 50
    //     },
    //   }
    // ],
    checkedGoodsCount: 2,
    checkedGoodsAmount: '',
    isEditCart: false,
    isLogin: false,
    checkedAllStatus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //跳转到下单页面
  goPay: function() {
    wx.navigateTo({
      url: '../../pages/buy/checkout/checkout',
    })

  },
  buyClick: function(e) {
    var that = this,
      _isBuy = "";
    console.log("e:", e)
    console.log("isBuy:", that.data.isBuy)
    if (that.data.isBuy == true) {
      _isBuy = false
    } else {
      _isBuy = true
    }
    that.setData({
      isBuy: _isBuy
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
    this.getGoods();
    let isLogin = wx.getStorageSync('isLogin');
    if (isLogin) {
      this.setData({
        isLogin: true
      })
    }

    this.setData({
      checkedGoodsCount: this.getCheckedGoodsCount(),
      checkedGoodsAmount: this.getCheckedGoodsAmount()
    });
  },
  goLogin: function() {
    wx.navigateTo({
      url: '/pages/auth/tologin/tologin',
    })
  },
  checkedItem: function(e) {
    let index = e.target.dataset.index
    let id = e.target.dataset.id
    this.setData({
      [`cartGoods[${index}].checked`]: !this.data.cartGoods[index].checked,
      checkedGoodsCount: this.getCheckedGoodsCount(),
      checkedGoodsAmount: this.getCheckedGoodsAmount()
    });
    this.setData({
      checkedGoodsCount: this.getCheckedGoodsCount(),
      checkedGoodsAmount: this.getCheckedGoodsAmount()
    });
  },
  getCheckedGoodsAmount: function() {
    let totalPrice = 0
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        totalPrice += v.goodsPrice * v.number
      }
    })
    return totalPrice.toFixed(2)
  },
  getCheckedGoodsCount: function() {
    let checkedGoodsCount = 0
    this.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number
      }
    })
    return checkedGoodsCount
  },
  editCart: function() {
    this.setData({
      isEditCart: !this.data.isEditCart
    });
  },
  checkedAll: function() {
    if (this.data.checkedAllStatus) {
      this.setData({
        checkedAllStatus: !this.data.checkedAllStatus,
        checkedGoodsCount: '',
        checkedGoodsAmount: '0.00'
      });
      for (var i = 0; i < this.data.cartGoods.length; i++) {
        this.setData({
          [`cartGoods[${i}].checked`]: false,
        })
      }
    } else {
      for (var i = 0; i < this.data.cartGoods.length; i++) {
        this.setData({
          [`cartGoods[${i}].checked`]: true,
        })
      }
      this.setData({
        checkedAllStatus: !this.data.checkedAllStatus,
        checkedGoodsCount: this.getCheckedGoodsCount(),
        checkedGoodsAmount: this.getCheckedGoodsAmount()
      });
    }
  },
  deleteCart: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除所选购物车商品？',
      confirmColor: '#b4282d',
      success: function(res) {
        if (res.confirm) {
          that.setData({
            cartGoods: []
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  checkoutOrder: function() {
    wx.navigateTo({
      url: '/pages/buy/checkout/checkout',
    })
  },
  getGoods:function(){
    var that = this,
    token = wx.getStorageSync('token'),
    url = api.shop.shopList +'?token=' + token;
    toolkit.post(url,(res)=>{
      console.log("shopres:",res)
      var cartGoods = res.data.result;
      for (var i of cartGoods) {
        i.checked = true,
        i.number = 1;
      }
      that.setData({
        cartGoods: cartGoods
      })
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