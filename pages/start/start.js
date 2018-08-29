// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: "",//性别
    date: "",//日期
    region: ['', '', ''],//城市选择
    hiddenmodalput: true,//昵称弹出框默认隐藏
    name: "",//昵称
    _tempFilePaths: "../../image/sr.png"//默认头像
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 选择性别
  selSex: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['男', '女'],
      success: function (res) {
        console.log("111:", res)
        console.log("111:", res.tapIndex)
        if (res.tapIndex === 0) {
          that.setData({
            sex: "男"
          })
        } else {
          that.setData({
            sex: "女"
          })
        }
      }
    })
  },
  // 获取昵称
  getName: function (e) {
    var that = this
    var getname = e.detail.value;
    that.setData({
      name: getname
    })
  },
// 选择生日
  dateSel: function (e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  // 选择城市
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  // 取消按钮
  cancelM: function (e) {
    this.setData({
      hiddenmodalput: true,
    })
  },
// 确认按钮
  confirmM: function (e) {
    this.setData({
      hiddenmodalput: true,
    })
  },
// 昵称弹出框
  iName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
// 设置昵称
  infoChange: function () {
    console.log(111)
    var that = this
    that.setData({
      hiddenmodalput: false
    })
  },
  // 头像选择
  photoSel: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log("tempFilePaths:", tempFilePaths)
        that.setData({
          _tempFilePaths: tempFilePaths
        })
      }
    })
  },
  
  finishClick:function(){
    var that = this;
    if (that.data.region != "" && that.data.data != "" && that.data.sex !="" && that.data.name != "" ){
      wx.switchTab({
        url: '../../pages/index/index',
      })
    }else{
      wx.showToast({
        title: '请完善个人信息',
        icon:"none"
      })
    }

  }


})