// pages/shopping/shopping.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
var id = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartGoods: [],
    checkedGoodsCount: '',
    checkedGoodsAmount: '',
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
    var that = this;
    that.getGoods();
    that.setData({
      checkedGoodsCount: that.getCheckedGoodsCount(),
      checkedGoodsAmount: that.getCheckedGoodsAmount()
    });
  },
  //点击切换商品选中状态
  checkedItem: function(e) {
    var that = this;
    let index = e.target.dataset.index
    let id = e.target.dataset.id
    console.log("ids:", id)
    that.setData({
      [`cartGoods[${index}].checked`]: !that.data.cartGoods[index].checked,
      checkedGoodsCount: that.getCheckedGoodsCount(),
      checkedGoodsAmount: that.getCheckedGoodsAmount()
    });
    console.log("购物车列表长度：", that.data.cartGoods.length)
    for (let i = 0; i < that.data.cartGoods.length; i++){
      
    }
  },
  //获取选中商品的价格
  getCheckedGoodsAmount: function() {
    var that = this;
    let totalPrice = 0
    that.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        totalPrice += v.goodsPrice * v.number
      }
    })
    return totalPrice.toFixed(2)
  },
  //获取选中商品的数量
  getCheckedGoodsCount: function() {
    var that = this;
    let checkedGoodsCount = 0
    that.data.cartGoods.forEach(function(v) {
      if (v.checked === true) {
        checkedGoodsCount += v.number
      }
    })
    that.setData({
      checkedGoodsCount: checkedGoodsCount
    })
    return checkedGoodsCount
  },
  //全选
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
  //删除
  delGoods(e){
    var that = this;
    var goodsid = e.currentTarget.dataset.goodsid,
    token = wx.getStorageSync('token'),
    url = api.shop.delGoods+'?id='+goodsid+'&token='+token;
    wx.showModal({
      title:'提示',
      content:'确认删除该商品吗？',
      confirmColor:'#f63264',
      success:(res)=>{
        if(res.confirm){
          toolkit.post(url,(res)=>{
            wx.showToast({
              title: '成功删除商品',
            })
            that.getGoods()
          })
        }else if(res.cancel){
          that.getGoods()
        }
      }
    })

  },
  checkoutOrder: function() {
    wx.navigateTo({
      url: '/pages/buy/checkout/checkout',
    })
  },
  //获取购物车列表
  getGoods:function(){
    var that = this,
    token = wx.getStorageSync('token'),
    url = api.shop.shopList +'?token=' + token;
    toolkit.post(url,(res)=>{
      var cartGoods = res.data.result;
      if(res.data.code == 200){
        for (var i of cartGoods) {
          i.checked = true,
             i.number = 1;
        }
      }else if(res.data.code == 500){
      }
      that.setData({
        cartGoods: cartGoods
      })
      
    })
  },
  goClick:function(){
    var that = this;
    wx.navigateBack({
      delta:'1'
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