// pages/shopping/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectId: '',
    addressList: [
      {
        id: '1',
        name: 'Exrick',
        mobile: '17621230884',
        region: '四川省 成都市 武侯区',
        address: '益州大道888号香月湖7栋',
        isDefault: true,
        selected: true
      },
      {
        id: '2',
        name: 'xhy',
        mobile: '17621238888',
        region: '四川省 成都市 武侯区',
        address: '益州大道888号香月湖666栋',
        isDefault: false,
        selected: false
      }
    ]
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
    //加载地址数据
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
  deleteAddress: function () {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认要删除所选地址？',
      confirmColor: '#b4282d',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            addressList: []
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addressAddOrUpdate: function () {
    wx.navigateTo({
      url: '/pages/ucenter/addressAdd/addressAdd',
    })
  },
  chooseAddress: function (e) {
    let address = e.currentTarget.dataset.address

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面

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