// pages/postdetail/postdetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var pic = '',Newpic=[];
var postId = '',
  index = '',
  replyId = '',
  userId = '',
  read='',
  formid = '',
  attenStatus = '',
  thumbsStatus='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    att_status: '', //关注状态
    postdetail: '', //帖子详情
    userid: '', //帖子id
    formid: '' ,//评论人id
    myId:'',//我的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    postId = options.id
    console.log("postid:", postId)
  },
  
  //跳转到评论页面
  goComment: function(e) {
    var commid = e.currentTarget.dataset.commid;
    wx.navigateTo({
      url: '../../pages/quiz/quiz?id=' + commid + '&index=' + 1,
    })
  },
  //回复
  commClick: function(e) {
    var that = this,
      replyid = e.currentTarget.dataset.replyid,
      token = wx.getStorageSync('token'),
      url = api.post.remove + '?id=' + replyid + '&token=' + token,
      myId = wx.getStorageSync("myid");
    console.log("replyid:", replyid)
    console.log("userid", myId, userId, formid)
    if (myId == userId || myId == formid) {
      wx.showActionSheet({
        itemList: ['评论', '删除'],
        success: function(res) {
          console.log("111:", res.tapIndex)
          if (res.tapIndex === 0) {
            wx.navigateTo({
              url: '../../pages/quiz/quiz?replyid=' + replyid + '&index=' + 2,
            })
          } else if (res.tapIndex === 1) {
            toolkit.post(url, (res) => {
              wx.showToast({
                title: '成功删除',
                success: function() {
                  that.getpostDetail()
                }
              })
            })
          }

        }
      })
    }else{
      wx.showActionSheet({
        itemList: ['评论'],
        success: function (res) {
          console.log("111:", res.tapIndex)
          if (res.tapIndex === 0) {
            wx.navigateTo({
              url: '../../pages/quiz/quiz?replyid=' + replyid + '&index=' + 2,
            })
          } 
        }
      })
    }

  },
  //预览大图
  clickImg:function(e){
    Newpic=[];
    var index = e.currentTarget.dataset.index
    console.log(index)
    for(let i=0;i<pic.length;i++){
      var newpic = host+pic[i]
      Newpic.push(newpic);
    }
    wx.previewImage({
      current:'index',
      urls: Newpic,
    })
  },
  replayClick: function(e) {
    var commentId = e.currentTarget.dataset.reid;
    console.log("commentId:", commentId)
    wx.navigateTo({
      url: '../../pages/quiz/quiz?commentId=' + commentId + '&index=' + 3,
    })
  },
  //帖子详情
  getpostDetail: function() {
    wx.showLoading({
      title: '正在加载',
    })
    var that = this,
      token = wx.getStorageSync('token'),
      id = postId,
      url = api.post.postDetail + '?id=' + id + '&token=' + token;
    var myid = wx.getStorageSync('myid')
    toolkit.get(url, (res) => {
      wx.hideLoading()
      var postdetail = res.data.result.article,
        userid = res.data.result.article.userId,
        read = res.data.result.article.commentList; 
      attenStatus = res.data.result.followStatus;
      thumbsStatus = res.data.result.article.thumbsStatus;
      userId = userid;
      pic = postdetail.imgList;
      console.log('555', userid, userId)
      if (res.data.result.commentList != null) {
        for (let i = 0; i < read.length; i++) {
          console.log("评论标识：", read[i].signRead)
        }
        formid = res.data.result.article.commentList[0].fromUid
      }
      console.log("formid:", formid)
      console.log('postdetail:', postdetail)
      that.setData({
        postdetail: postdetail,
        userid: userid,
        formid: formid,
        att_status: attenStatus,
        myId:myid
      })
    })
  },
  // 点赞和取消点赞
  likeClick: function (e) {
    var that = this, typeId = e.currentTarget.dataset.commid;
    var token = wx.getStorageSync('token');
    if (thumbsStatus == 0) {
      var url1 = api.like.like + '?token=' + token + '&typeId=' + typeId
      toolkit.post(url1, (res) => {
        console.log("111",res)
      })
    } else if (thumbsStatus == 1) {
      var url = api.like.removelike + '?token=' + token + '&typeId=' + typeId
      toolkit.post(url, (res) => {
        console.log("112", res)
      })
    }
    that.getpostDetail()
  },

  // 关注和取消关注
  attenClick: function (e) {
    var that = this,  token = wx.getStorageSync('token'); 
    if (attenStatus == 0) {
      var url = api.attention.addatten + '?token=' + token + '&userId=' + userId;
      toolkit.post(url,(res)=>{
        that.setData({
          att_status: 1
        })
      })
      attenStatus = 1
    } else if (attenStatus == 1) {
      var url1 = api.attention.removeatten + '?token=' + token + '&userId=' + userId;
      toolkit.post(url1,(res)=>{
        that.setData({
          att_status: 0
        })
      })
      attenStatus = 0
    }
    
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
    var that = this;
    that.getpostDetail()
    that.setData({
      host:host
    })
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
    this.getpostDetail()
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