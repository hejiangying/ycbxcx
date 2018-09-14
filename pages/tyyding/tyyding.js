// pages/booking/booking.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var lineid='',price='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _date: '',
    price: '', //订购数量总计默认为0
    name: '', //姓名
    ids: '', //电话
    code:'',//身份证号码
    totalPrice: 0, //订购总价默认为0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('canshu :',options)
    lineid = options.id
    price = options.price
  },
  // 日期选择
  dateSel: function(e) {
    var that = this;
    that.setData({
      _date: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    that.setData({
      region: e.detail.value
    })
  },
  //获取输入的真实姓名
  getName: function(e) {
    var that = this;
    console.log("e:", e)
    var nickname = e.detail.value;
    that.setData({
      name: nickname 
    });
  },
  //获取电话号码
  getId: function(e) {
    var that = this;
    that.setData({
      ids: e.detail.value
    });
  },
  getCode(e){
    var that = this;
    that.setData({
      code:e.detail.value
    })
  },
  //跳转到下单页面
  goPay: function() {
    var that = this,
    token = wx.getStorageSync('token'),
      url = api.order.orderGoods + '?token=' + token + '&itemId=' + lineid + '&linkcode=' + that.data.code + '&startPlay=' + that.data._date +'&linkman='+that.data.name+'&linkphone='+that.data.ids;
    if(that.data._date != '' && that.data.code != '' && that.data.name != '' && that.data.ids != ''&& that.data._date !=''){
      toolkit.post(url, (res) => {
        wx.showToast({
          title: '下单成功，去支付',
          icon:'none',
          duration:1000,
          success:()=>{
            wx.switchTab({
              url: '/pages/order/order',
            })
          }
        })
      })
    }else{
      wx.showToast({
        title: '请填写详细信息',
        icon:'none'
      })
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
    this.setData({
      price:price
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