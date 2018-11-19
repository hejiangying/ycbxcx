// pages/myfans/myfans.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var currentPage = 1, totalpage = '', sumList = [], isLoadmore = false;//当前页，总页数，总列表数，是否需要加载更多
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attstatus:'',//是否关注
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  getattList() {
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this, token = wx.getStorageSync('token'), url = api.attention.myattention + '?token=' + token + '&type=' + 1 + '&pageNumber=' + currentPage;
    toolkit.get(url, (res) => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      var attenList = res.data.result;
      totalpage = res.data.result.totalPages
      if (isLoadmore == true) {
        sumList = sumList.concat(attenList)
      } else {
        sumList = attenList
      }
      that.setData({
        attenList: sumList
      })
    })

  },
  addClick(e){
    var that = this,id=e.currentTarget.dataset.id,token=wx.getStorageSync('token');
    var url = api.attention.addatten+'?token='+token+'&userId='+id
    toolkit.post(url,(res)=>{
      that.getattList()
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
    that.getattList()
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
    this.getattList()
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