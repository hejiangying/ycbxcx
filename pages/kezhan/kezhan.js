// pages/kezhan/kezhan.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var d1='',d2='',roomId='',hotelld='',itemid='',price='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    date2:'',
    d3:'',
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    status: false,
    per:'',//入住人姓名
    id:'',//入住人身份证号码
    tel:'',//入住人联系方式
    price:'0.00'
  },
  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })
    let dates = e.detail.value
    let str = dates.replace(/-/g, '/')
    let time1 = new Date(str)
    let time = time1.getTime()
    console.log("time1:",time)
    d1 = time
  },
  bindDateChange2(e) {
    let that = this;
    that.setData({
      date2: e.detail.value,
    })
    let dates = e.detail.value
    let str = dates.replace(/-/g, '/')
    let time1 = new Date(str)
    let time = time1.getTime()
    d2 = time
    that.getTime()
  },
  //计算总天数
  getTime(){
    var that  = this;
    console.log("d1:",d1)
    console.log("d2:", d2)
    let d3 = (d2-d1)/(60*60*24)/1000
    console.log("d3:",d3)
    var that = this;
    that.setData({
      d3:d3
    })
  },
  // 查看评论
  commSee: function () {
    wx.navigateTo({
      url: '../../pages/comments/comments',
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  inputper:function(e){
    var that = this;
    console.log("888888:",e)
    that.setData({
      per:e.detail.value
    })
  },
  inputid(e){
    var that = this;
    that.setData({
      id:e.detail.value
    })
  },
  inputtel(e){
    var that = this;
    that.setData({
      tel:e.detail.value
    })
  },
  goOrder(){
    var that = this;
    if(that.data.per != '' && that.data.id != '' && that.data.tel != '' && that.data.date != '' && that.data.date2 !='' && that.data.d3 != ''){
      var token = wx.getStorageSync('token'),
        url = api.appHotel.order + '?roomId=' + hotelld + '&hotelId=' + roomId + '&clientName=' + that.data.per + '&identitfy=' + that.data.id + '&telephone=' + that.data.tel + '&checkInTime=' + that.data.date + '&checkOutTime=' + that.data.date2 + '&recType='+itemid +'&token='+token;
      toolkit.post(url,(res)=>{
        wx.showToast({
          title: '下单成功,请及尽快结算',
          icon:'none'
        })
        that.setData({
          price:price
        })
      })
    }else{
      wx.showToast({
        title: '请完善预订信息',
        icon:'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("99:",options)
    roomId = options.goodsid;
    hotelld = options.houseid;
    itemid = options.itemid;
    price = wx.getStorageSync('price')
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
    var that =this;
    that.getTime()
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