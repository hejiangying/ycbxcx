// pages/mypost/mypost.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],//帖子列表
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
  //获取帖子列表
  getpostList:function(){
    var that = this,
    params = {
      token: wx.getStorageSync('token')
    },
    url = api.post.mypost;
    toolkit.get(url,params,(res)=>{
      console.log("帖子列表：",res)
      var postList = res.data.result.content
    that.setData({
      postList:postList,
    })
    })

  },
// 跳转到编辑帖子页面
  postEdit:function(){
    wx.navigateTo({
      url: '../../pages/post/post',
    })
  },
  // 删除帖子
  postDel:function(e){
    var that = this;
    console.log("e:",e)
    var id = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      url = api.post.postDel +'?id=' + id + '&token='+token ;
    console.log("id:",id)
    wx.showActionSheet({
      itemList: ['删除'],
      success: () =>{
        console.log("111:", res.tapIndex)
        if (res.tapIndex === 0) {
          toolkit.post(url, (res) =>{
            console.log("shanchu ")
            that.getpostList()
          })
        }
        
      }
    })
  },
  commSee:function(e){
    console.log("e1:",e)
    var that = this,
    id = e.currentTarget.dataset.id;
    console.log("id1,",id)
    wx.navigateTo({
      url: '../../pages/mypost-comm/mypost-comm?id='+id,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that =this;
    that.getpostList()
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