// pages/shopping/coupon/coupon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [
      {
        id: '1',
        tag: '新人专享',
        name: '限时免单券',
        time: '2018.03.20-2018.03.30',
        description: '饮食类目专享；限时购等详情页标注不可用券的商品除外不可用券的商品除外',
        discount: -1, //折扣金额 -1代表全部
        showAll: false,
        selected: false
      }
    ],
    couponCode: '',
    selectId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择优惠券'
    })
    let couponId = options.couponId
    if (couponId) {
      this.setData({
        selectId: couponId
      })
      this.getSelectedCoupon()
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
  showAllDes: function (e) {
    let index = e.target.dataset.index
    this.setData({
      [`couponList[${index}].showAll`]: !this.data.couponList[index].showAll
    })
  },
  clearInput: function () {
    this.setData({
      couponCode: '',
    })
  },
  inputChange: function (e) {
    let value = e.detail.value
    this.setData({
      couponCode: value
    })
  },
  changeCoupon: function (e) {
    if (this.data.couponCode === '') {
      return
    }
    wx.showToast({
      title: '优惠码错误',
      image: '/images/error.png',
    })
  },
  chooseCoupon: function (e) {
    let coupon = e.currentTarget.dataset.coupon
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面

    let discount = coupon.discount
    if (discount == -1) {
      discount = prevPage.data.goodsTotalPrice
    }
    let actualPrice = parseFloat(prevPage.data.goodsTotalPrice) + parseFloat(prevPage.data.freightPrice) - parseFloat(discount)
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      couponId: coupon.id,
      couponName: coupon.name,
      couponPrice: discount,
      actualPrice: actualPrice.toFixed(2)
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  clearCoupon: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.setData({
      couponId: '',
      couponName: '',
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getSelectedCoupon:function(){
    //给选择的地址添加样式标记
    for (let i = 0; i < this.data.couponList.length; i++) {
      if (this.data.couponList[i].id == this.data.selectId) {
        this.setData({
          [`couponList[${i}].selected`]: true
        })
      } else {
        this.setData({
          [`couponList[${i}].selected`]: false
        })
      }
    }
  }
})