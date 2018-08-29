// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ortp: 1
  },
  // 订单状态的选择
  orderSelect:function(e){
    var that = this;
    var _order = e.currentTarget.dataset.order;
    that.setData({
      ortp : _order
    })
  },
  seeDetail:function(){
    wx.navigateTo({
      url: '../../pages/seeorder/seeorder',
    })
  },
  payClick:function(){
    wx.navigateTo({
      url: '../../pages/buy/checkout/checkout',
    })
  },
  commClick:function(){
    wx.navigateTo({
      url: '../../pages/commentPost/commentPost',
    })
  }

 
})