// pages/post/post.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var originalList = [],
  index = 0,
  uploadpic = [],
  edit = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist:[],//图片集合
    postcon:"",//帖子的内容
    picList:'',
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
    if (that.data.imglist.length < 9) {
      wx.chooseImage({
        count: 9 - that.data.imglist.length,
        success: function (res) {
          that.uploadImg()
          that.setData({
            imglist: that.data.imglist.concat(res.tempFilePaths)
          })
          that.uploadImg()
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
  //上传图片
  uploadImg:function(){
    var that = this;
    var url = api.img.upload;
    console.log("654:", that.data.imglist[index])
    wx.uploadFile({
      url: url,
      filePath: that.data.imglist[index],
      name: 'file',
      formData: {
        file: 'file',
        identify:'article'
      },
      success: function (res) {
        var json = JSON.parse(res.data);
        console.log("666:",index,res)
        var picList = json.result.relativePaths;
        // wx.setStorageSync('imglist', picList)
        index++;
        uploadpic.push(picList)
        console.log(uploadpic)
      }
    })
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
    // var nn = wx.getStorageSync('imglist')
    var params = {
        token: wx.getStorageSync('token'),
        content: that.data.postcon,
        picList:uploadpic.toString()
    },
    url = api.post.postCreat;
    if ( that.data.postcon != "" || uploadpic.length != 0){
      toolkit.post(url,params,(res)=>{
        if(res.data.code == 200){
          console.log("帖子内容：", res)
          wx.showToast({
            title: '帖子发布成功，审核通过后方可查看',
            icon: 'none'
          })
          // wx.navigateTo({
          //   url: '../../pages/mypost/mypost',
          // })
        }else{
          wx.showToast({
            title: '网络请求错误',
            icon:'loading',
            duration:3000
          })
        }
        
      })
    }else{
      wx.showToast({
        title: '请输入文字或者选择图片',
        icon:"none"
      })
    }
    that.setData({
      postcon:'',
      imglist:[]
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