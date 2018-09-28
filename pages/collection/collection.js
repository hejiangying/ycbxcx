// pages/shopping/shopping.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
var goodsList = [],currentPage=1,totalpage='',sumList=[],isLoadmore=false;//收藏列表第一页，当前页，总页数,收藏列表页数,是否需要加载更多
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
    var that = this, token = wx.getStorageSync('token'), url = api.collection.mycollection + '?token=' + token + '&pageNumber=' + currentPage;
    toolkit.post(url,(res)=>{
      wx.stopPullDownRefresh()
      var goods = res.data.result.content;
      totalpage = res.data.result.totalPages
      if(isLoadmore==true){
        sumList = sumList.concat(goods)
      }else{
        sumList = goods
      }
     
      goodsList= goods;
      that.setData({
        goods: sumList
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
  goClick(){
    wx.switchTab({
      url: '../../pages/index/index',
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
    isLoadmore=false
    currentPage=1
    that.getGoods()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载更多")
    var that = this;
    if(currentPage != totalpage){
      currentPage++
      isLoadmore=true
      that.getGoods()
    }else{
      wx.showLoading({
        title: '没有更多了',
        success:()=>{
          setTimeout(function(){
            wx.hideLoading()
          },3000)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})