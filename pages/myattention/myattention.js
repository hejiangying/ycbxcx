// pages/myattention/myattention.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var attList = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  getattList(){
    var that = this, token = wx.getStorageSync('token'), url = api.attention.myattention+'?token='+token+'&type='+0;
    toolkit.get(url,(res)=>{
      var attenList = res.data.result;
      attList = attenList;
      that.setData({
        attenList:attenList
      })
    })

  },
  //取消关注
  attClick: function (e) {
    var that = this, token = wx.getStorageSync('token'), id=e.currentTarget.dataset.id;
    console.log("id", id,attList)
    for (let i = 0; i < attList.length; i++) {
      if (attList[i].followId == id) {
        var url1 = api.attention.removeatten + '?token=' + token + '&followId=' + id;
        toolkit.post(url1, (res) => {
          that.getattList()
        })
      }
    }
  },
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
    that.getattList()
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