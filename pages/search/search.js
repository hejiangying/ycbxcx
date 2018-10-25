// pages/search/search.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var searchcon = '';//搜索的内容
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    searchStatus: false,
    currentSortType: 'default',
    currentSortOrder: '',
    goodsList: [],
    goodsitemList:[],
    hotelList:[],
    lineList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
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
    this.setData({
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
  inputChange: function (e) {
    let value = e.detail.value
    searchcon = value
    this.setData({
      keyword: value
    })
  },
  onKeywordConfirm: function (e) {
    console.log("biaoti:", searchcon)
    var that = this;
    //开始搜索
    this.setData({
      searchStatus: true
    })
   
    var url = api.home.home + '?title=' + searchcon;
    toolkit.get(url, (res) => {
      wx.stopPullDownRefresh();
      var goodsList = res.data.result.goodsList.content
      var hotelList = res.data.result.hotelList.content
      var lineList = res.data.result.lineList.content
      var goodsitemList = res.data.result.goodsItemList.content
      that.setData({
        goodsList: goodsList,
        hotelList: hotelList,
        lineList: lineList,
        goodsitemList: goodsitemList
      })
    })
    
  },
  
  inputFocus: function () {
    this.setData({
      searchStatus: false,
    });
  },
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    })
  },
  closeSearch: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  onKeywordTap: function (e) {
    let value = e.target.dataset.keyword
    this.setData({
      keyword: value,
      searchStatus: true
    })
  },
  getHelpKeyword: function () {

  }
})