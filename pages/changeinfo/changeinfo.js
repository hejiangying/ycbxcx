// pages/ucenter/addressAdd/addressAdd.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
var avatar = '',time = 1 //头像,次数
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked: '',
    addressName: [],
    consignee: '',
    address: '',
    sex: '',
    date: '',
    date2: '',
    tempFilePaths: [],
    myinfo:'',
    avatar:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("------------onshow--------------------")
    if(time == 1){
      this.getInfo()
    }else{

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

  },
  nameInput: function(e) {
    console.log("name:", e.detail.value)
    var that = this;
    that.setData({
      consignee: e.detail.value
    })
  },
  //性别选择
  sexInput: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success(res) {
        if (res.tapIndex == 0) {
          var selsex = 1
        } else if (res.tapIndex == 1) {
          var selsex = 2
        }
        var oldsex = that.data.sex
        that.setData({
          sex:selsex
        })
      }
    })
  },
  bindRegionChange: function(e) {
    var that = this;
    console.log("address:", e.detail.value)
    that.setData({
      addressName: e.detail.value
    })
  },
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })
  },
  //获取个人信息
  getInfo() {
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.apiUser.info + '?token=' + token;
    toolkit.post(url, (res) => {
      var myinfo = res.data.result
      that.setData({
        myinfo: myinfo,
        consignee: myinfo.alias,
        sex: myinfo.sex,
        avatar: myinfo.avatar,
        addressName:myinfo.city,
        date:myinfo.birthday
      })
    })

  },
  //改变头像
  changePho() {
    var that = this,tempFilePaths = [],newtem='';time = 2;
    console.log('that.data1111', that.data.avatar)
    wx.chooseImage({
      count: 1,
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        tempFilePaths = res.tempFilePaths
        console.log('选择头像：', tempFilePaths[0])
        that.setData({
          avatar: tempFilePaths[0]
        })
        console.log('that.data', that.data.avatar)
      }
    })
    
  },
  save(){
    var token = wx.getStorageSync('token'),that = this;
    let url = api.apiUser.updata + '?nickName=' + that.data.consignee + '&avatar=' + that.data.avatar + '&sex=' + that.data.sex + '&birthday=' + that.data.date + '&city=' + that.data.addressName+'&token='+token;
    toolkit.post(url,res=>{
      wx.showToast({
        title: '修改成功',
      })
    })
  }
 
})