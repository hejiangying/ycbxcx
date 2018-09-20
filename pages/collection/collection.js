// pages/shopping/shopping.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
var goodsList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getGoods(){
    var that = this, token = wx.getStorageSync('token'), url = api.collection.mycollection+'?token='+token;
    toolkit.post(url,(res)=>{
      var goods = res.data.result.content;
      goodsList= goods;
      that.setData({
        goods:goods
      })
    })
  },
  goDetail(e){
    var goodsid = e.currentTarget.dataset.id;
    console.log("999", goodsid)
    console.log("888:", goodsList[0].collentUrl)
    var goodsurl='';
    console.log("666:", goodsList)
    for (let i = 0; i < goodsList.length; i++) {
      if (goodsList[i].productId == goodsid)
         goodsurl = goodsList[i].collentUrl
    }
    console.log("777:", goodsurl)
    wx.navigateTo({
      url: '../../'+goodsurl+'?id='+goodsid,
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

  }
})