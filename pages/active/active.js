// pages/active/active.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _conlist: [],
    marks: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          longitude: longitude,
          latitude: latitude
        })
      toolkit.get(api.play.playList,(res)=>{
        var marklist = res.data.result
        console.log(marklist)
        var marks = that.data.marks;
        for (var i = 0; i < marklist.length; i++) {
          marks.push({})
          marks[i].id = marklist[i].id
          marks[i].iconPath = '/image/addr.png'
          marks[i].latitude = marklist[i].latitude
          marks[i].longitude = marklist[i].longitude
          marks[i].callout = {
            content: '22',
            borderRadius: 3,
            padding: 5,
            fontSize: 10,
            // bgColor: '#e37fb0',
            display: 'ALWAYS'
          }
          marks[i].title = marklist[i].title
          var conlist = that.data._conlist;
          for (var j = i; j < marklist.length; j++) {
            conlist.push(marklist[j].callout.content) 
          }
          marks[i].callout.content = conlist[i]
        }
        that.setData({
          markers: marks
        })
      })
      }
    });
  },
  addrClick:function(e){
    console.log("e",e)
    wx.navigateTo({
      url: '../../pages/goodsdetail/goodsdetail?id=' + e.markerId,
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