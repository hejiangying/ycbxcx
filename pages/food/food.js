// pages/food/food.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist:[],
    id:'',
    imgList:[],
    imglist:[],//封面
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  foodClick:function(e){
    var id = e.currentTarget.dataset.id;
    console.log("555", id)
    var that = this;
    wx.navigateTo({
      url: '../../pages/anotherfood/anotherfood?id='+ id,
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
    that.getgoods()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  //获取商品列表
  getgoods: function () {
    var that = this,
      params = {
        token: wx.getStorageSync('token')
      };
      wx.showLoading({
        title: '加载中...'
      })
    console.log('api.appGoods.another,', api.appGoods.another)
    toolkit.get(api.appGoods.another, params, (res)=> {
      wx.hideLoading()
      var goodslist = res.data.result.content
      that.setData({
        goodslist:goodslist
      })
    })

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