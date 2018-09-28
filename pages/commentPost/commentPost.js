// pages/commentPost/commentPost.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
var originalList = [],
  index = 0,
  edit = false,
  uploadpic = [],
  goodsid='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods0: [],
    goods1:[],
    goods2:[],
    goods3: [],
    star:5,
    rectype:'',
    inputcon:'',
    imglist: [], //图片集合
    picList: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("eeeeeeeee", options)
    goodsid= options.id
  },
  clickstar(e){
    var that = this;
    var star = e.currentTarget.dataset.star;
    that.setData({
      star:star
    })

  },

  // 选择图片
  photoSel() {
    if (this.data.imglist.length < 9) {
      wx.chooseImage({
        count: 9 - this.data.imglist.length,
        success: (res) => {
          for (let i = 0; i <= res.tempFilePaths.length - 1; i++) {
            this.data.imglist.push(res.tempFilePaths[i]);
          }
          this.setData({
            imglist: this.data.imglist
          })
          this.uploadImg()
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
  uploadImg() {
    var url = api.img.upload;
    wx.showLoading({
      title: '正在上传',
    })
    console.log("that:", this)
    console.log(this.data.imglist[index]);
    wx.uploadFile({
      url: url,
      filePath: this.data.imglist[index],
      name: 'file',
      formData: {
        file: 'file',
        identify: 'article'
      },
      success: (res) => {
        var json = JSON.parse(res.data);
        console.log("图片:", index, res)
        var picList = json.result.relativePaths;
        if (index == this.data.imglist.length - 1) {
          console.log("已是最后一张图片")
          wx.hideLoading()
          uploadpic.push(picList)
        } else {
          index++;
          uploadpic.push(picList)
          console.log('上传图片集合', uploadpic)
          this.uploadImg()
        }
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
  bindInpuntValue: function (e) {
    console.log(e.detail.value)
    let input = e.detail.value
    this.setData({
      inputcon: input,
    })
  },
  //获取详情
  getDetail() {
    var that = this
    wx.showLoading({
      title: '正在加载...'
    })
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.order.orderdetail + '?id=' + goodsid + "&token=" + token;
    toolkit.post(url, (res) => {
      wx.hideLoading()
      var rectype = res.data.result.recType
      if(rectype == 0){
        var goods0 = res.data.result.ordersHotelList
        that.setData({
          goods1: goods1
        })
      }else if(rectype == 1){
        var goods1 = res.data.result.ordersHotelList
        that.setData({
          goods1:goods1
        })
      }else if(rectype == 2){
        var goods2 = res.data.result.ordersLineList
        that.setData({
          goods2: goods2
        })
      }else if(rectype == 3){
        var goods3 = res.data.result.ordersItemList
        that.setData({
          goods3:goods3
        })
      }
      that.setData({
        rectype:rectype
      })
    })
  },
  //发表
  onPost(){
    var that = this;
    if (that.data.inputcon == '' && uploadpic == ''){
      wx.showToast({
        title: '请填写评价',
        icon:''
      })
    }else{
      var that = this, token = wx.getStorageSync('token'), url = api.order.ordercomm + '?token=' + token + '&id=' + goodsid + '&content=' + that.data.inputcon + '&picList=' + uploadpic +'&score=' + that.data.star;
      toolkit.post(url,(res)=>{
        wx.showToast({
          title: '评价成功',
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
    var that = this;
    that.getDetail()
    console.log(1111111111, that.data.imgList)
    console.log(222222222222, uploadpic)
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

  },
  
  
  
})