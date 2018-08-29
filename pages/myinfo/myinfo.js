// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:"男",//性别
    date:"2018-07-16",//出生日期
    region: ['云南省', '大理白族自治州', '大理市'],//地址
    hiddenmodalput: true,
    name: "",//姓名
    sign: '',//个性签名
    _tempFilePaths:"http://pic33.photophoto.cn/20141226/0008020848117867_b.jpg"//默认头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  // 性别选择
  selSex:function(){
    var that = this;
    wx.showActionSheet({
      itemList:['男','女'],
      success:function(res){
        console.log("111:", res)
        console.log("111:",res.tapIndex)
        if(res.tapIndex === 0){
          that.setData({
            sex:"男"
          })
        }else{
          that.setData({
            sex: "女"
          })
        }
      }
    })
  },
  // 日期选择
  dateSel:function(e){
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
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

  iName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  iSign: function (e) {
    this.setData({
      sign: e.detail.value
    })
  },
  infoChange:function(){
    console.log(111)
    var that = this
    that.setData({
      hiddenmodalput: false
    })
  },
  // 头像选择
  photoSel:function(){
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
  }


})