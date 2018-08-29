// pages/post/post.js
var originalList = [],
  edit = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist:[],//图片集合
    posttitle:"",//帖子的标题
    postcon:""//帖子的内容
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
  // 选择图片
  photoSel:function(){
    var that = this
    console.log("that.data",that.data)
    if (that.data.imglist.length < 9) {
      wx.chooseImage({
        count: 9 - that.data.imglist.length,
        success: function (res) {
          that.setData({
            imglist: that.data.imglist.concat(res.tempFilePaths)
          })
        },
      })
    } else {
      wx.showToast({
        title: '最多选择9张图片',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 删除某个图片
  deletePic: function (e) {
    var that = this;
    that.data.imglist.splice(e.currentTarget.id, 1);
    if (edit == 'true') {
      originalList.splice(e.currentTarget.id, 1)
    }
    that.setData({
      imglist: that.data.imglist
    })
  },
  // 获取标题
  getTitle:function(e){
    var that = this;
     console.log('创建题目：', e.detail.value);
    that.setData({
      posttitle: e.detail.value
    })
  },
  // 获取内容
  getContent: function (e) {
    var that = this;
    // console.log('创建内容：', e.detail.value);
    that.setData({
      postcon: e.detail.value
    })
  },
// 发布帖子
  creatPost:function(){
    var that = this;
    console.log("imglist:",that.data.imglist.length)
    console.log("that.data.postcon:", that.data.postcon)
    console.log("that.data.posttitle:", that.data.posttitle)

    if (that.data.posttitle != "" || that.data.postcon != "" || that.data.imglist.length != 0){
      wx.navigateTo({
        url: '../../pages/mypost/mypost',
      })
    }else{
      wx.showToast({
        title: '请输入文字或者选择图片',
        icon:"none"
      })
    }
    that.setData({
      posttitle:'',
      postcon:""
    })
   
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