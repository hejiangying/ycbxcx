// pages/store/store.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var storeId = '', attenStatus = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuIdex: 1,
    storeInfo: '', 
    att_status: '', //关注状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    storeId = options.storeId
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
    this.getInfo()
    this.setData({
      host:host
    })
  },
  getInfo() {
    let url = api.shop.store + '?supplierId=' + storeId
    toolkit.get(url, res => {
      this.setData({
        storeInfo: res.data.result, 
        att_status:res.data.result.supplier.status
      })
    })
  },
  menuClick(e) {
    var that = this,
      menuId = e.currentTarget.dataset.index;
    that.setData({
      menuIdex: menuId
    })
  },
  attClick(e) {
    var stoId = e.currentTarget.dataset.id
    var that = this, token = wx.getStorageSync('token');
    if(token != ''){
      if (attenStatus == 0) {
        var url = api.attention.addatten + '?token=' + token + '&userId=' + stoId;
        toolkit.post(url, (res) => {
          that.setData({
            att_status: 1
          })
        })
        attenStatus = 1
      } else if (attenStatus == 1) {
        var url1 = api.attention.removeatten + '?token=' + token + '&userId=' + stoId;
        toolkit.post(url1, (res) => {
          that.setData({
            att_status: 0
          })
        })
        attenStatus = 0
      }
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
   

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