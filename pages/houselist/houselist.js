// pages/food/food.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var itemId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    houselist: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    itemId = options.itemId
  },
  foodClick: function (e) {
    console.log("客栈id：",e)
    var houseid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/housedetail/housedetail?id=' + houseid + '&itemId=' + itemId,
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
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this,
      params = {
        token: wx.getStorageSync('token')
      };
    console.log('api.appHotel.houselist,', api.appHotel.houselist)
    toolkit.get(api.appHotel.houselist, params,  (res) => {
      wx.hideLoading()
      var houselist = res.data.result.content
      that.setData({
        houselist:houselist
      })
    },()=>{
        wx.hideLoading()
        wx.showToast({
          title: '网络出错',
          image:'../../image/error.png'
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