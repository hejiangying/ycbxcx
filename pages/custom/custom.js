// pages/custom/custom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _name:'',//联系人
    _phone:'',//联系方式
    _bourn:'',//目的地
    _origin:'',//出发地
    _num:'',//出行人数
    date:'',//出发时间
  },
  //获取联系人
  nameinput:function(e){
    console.log(e)
    var that = this;
    var _name = e.detail.value;
    that.setData({
      _name:_name
    })
  },
  //获取联系方式
  phoneinput:function(e){
    var that = this;
    var _phone = e.detail.value;
    that.setData({
      _phone: _phone
    })
  },
  //获取目的地
  bourninput: function (e) {
    var that = this;
    var _bourn = e.detail.value;
    that.setData({
      _bourn: _bourn
    })
  },
  //获取出发地
  origininput: function (e) {
    var that = this;
    var _origin = e.detail.value;
    that.setData({
      _origin: _origin
    })
  },
  //获取出发人数
  numinput:function(){
    var that = this;
    var _num = e.detail.value;
    that.setData({
      _num: _num
    })
  },
  //选择出发时间
  bindDateChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var date = that.data.date
    that.setData({
      date: e.detail.value
    })
  },
  //点击提交定制
  customClick:function(){
    var that = this;
    if (that.data._name == '' || that.data._phone == '' || that.data._bourn == '' || that.data._origin == '' || that.data._num == ''){
      wx.showToast({
        title: '请填写完整信息',
        icon:'none'
      })
    }else{
      console.log(111)
    }
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