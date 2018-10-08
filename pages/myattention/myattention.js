// pages/myattention/myattention.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var attList = '';
var currentPage = 1, totalpage = '', sumList = [], isLoadmore = false;//当前页，总页数，总列表数，是否需要加载更多
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
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this, token = wx.getStorageSync('token'), url = api.attention.myattention+'?token='+token+'&type='+0+'&pageNumber='+currentPage;
    toolkit.get(url,(res)=>{
      wx.stopPullDownRefresh()
      wx.hideLoading()
      var attenList = res.data.result;
      attList = attenList;
      totalpage=res.data.result.totalPages
      if(isLoadmore == true){
        sumList = sumList.concat(attenList)
      }else{
        sumList = attenList
      }
      that.setData({
        attenList: sumList
      })
    })

  },
  //取消关注
  attClick: function (e) {
    var that = this, token = wx.getStorageSync('token'), id=e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否取消关注',
      confirmColor: '#f63264',
      success:function(res){
        console.log(res)
        if(res.confirm == true){
          for (let i = 0; i < attList.length; i++) {
            if (attList[i].followId == id) {
              var url1 = api.attention.removeatten + '?token=' + token + '&followId=' + id;
              toolkit.post(url1, (res) => {
                that.getattList()
              })
            }
          }
        } else if (res.cancel){

        }
        
      }
    })
   
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
    var that = this;
    currentPage=1
    isLoadmore=false
    that.getattList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if(currentPage != totalpage){
      currentPage++
      isLoadmore=true
      that.getattList()
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