// pages/shopping/address/address.js
const toolkit = require('../../../utils/ToolKit.js');
const api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectId: '',
    addressList: [],
    addressId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressId = options.addressId
    if(addressId){
      this.setData({
        selectId: addressId
      })
      this.getSelectedAddress()
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
    that.getshopList();
    //加载地址数据
  },
  //地址列表
  getshopList:function(){
    var that = this,
    token = wx.getStorageSync('token'),
    url = api.address.addressList+'?token='+token;
    toolkit.post(url,(res)=>{
      wx.stopPullDownRefresh()
      var addressList = res.data.result
      that.setData({
        addressList: addressList
      })
    })
  },
  //地址详情
  addressSee:function(e){
    var that = this;
    var addressId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../ucenter/updateaddress/updateaddress?id=' + addressId,
    })
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
    var that = this;
    that.getshopList()
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
  addressAddOrUpdate: function () {
    wx.navigateTo({
      url: '/pages/ucenter/addressAdd/addressAdd',
    })
  },
  chooseAddress: function (e) {
    let addressId = e.currentTarget.dataset.address.id
    let address = e.currentTarget.dataset.address
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    wx.setStorage({
      key: 'addressId',
      data: e.currentTarget.dataset.address.id,
      address:address
    })
    console.log('地址id：', addressId)
    console.log('地址：', address)
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      checkedAddress: address
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getSelectedAddress:function(){
    //给选择的地址添加样式标记
    for (let i = 0; i < this.data.addressList.length;i++){
      if (this.data.addressList[i].id==this.data.selectId){
        this.setData({
          [`addressList[${i}].selected`]: true
        })
      }else{
        this.setData({
          [`addressList[${i}].selected`]: false
        })
      }
    }
  }
})