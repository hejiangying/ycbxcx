// pages/quiz/quiz.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var articleId='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 输入框的内容
    content: '',
    //
    placeholder:'写评论...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("99955:",options)
    articleId = options.id
  },
  // 获取输入框内容
  getContent: function (e) {
    this.setData({
      content: e.detail.value
    })
    if (this.data.content.length >= 300) {
      wx.showToast({
        title: '评论已超过字数限制',
        icon:'none'
      })
    }
  },
  publish:function(){
    var that = this;
    if (that.data.content == '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon:'none'
      })
    } else {
      var token = wx.getStorageSync("token");
      var url = api.post.comment + '?articleId=' + articleId +'&content=' + that.data.content + '&token=' + token;
      console.log("url:",url)
      toolkit.post(url,(res)=>{
        console.log("8855:",res)
        wx.showToast({
          title: '评论成功',
          icon:'none',
          duration:1000,
          success:function(res){
            setTimeout(function () {
              wx.navigateBack({
              delta: 1
            })
            }, 2000)
          }
        })
      })
    }

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