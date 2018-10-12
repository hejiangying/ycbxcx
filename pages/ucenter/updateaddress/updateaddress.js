// pages/ucenter/addressAdd/addressAdd.js
const toolkit = require('../../../utils/ToolKit.js');
const api = require('../../../utils/api.js')
var addressId = '';
var checked = false;
Page({
  //页面的初始数据
  data: {
    isDefault: '',
    addressDetail: ''
  },

  //生命周期函数--监听页面加载
  onLoad: function(options) {
    addressId = options.id
    console.log(addressId)
  },
  // 生命周期函数--监听页面显示
  onShow: function() {
    var that = this;
    that.addressDetail();
  },
  addressDetail: function() {
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.address.addressDetail + '?token=' + token + '&id=' + addressId;
    toolkit.post(url, (res) => {
      var addressDetail = res.data.result;
      that.setData({
        addressDetail: addressDetail
      })
    })
  },
  addressDel: function() {
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.address.addressDel + '?token=' + token + '&id=' + addressId;
    wx.showModal({
      title: '提示',
      content: '是否删除该地址',
      confirmColor: '#f63264',
      success: function(res) {
        if (res.confirm) {
          toolkit.post(url, (res) => {
            wx.showToast({
              title: '删除地址成功',
              duration: 1000,
              success: function() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //是否设置默认地址
  _handleZanSwitchChange(e) {
    var dataset = e.currentTarget.dataset;
    console.log("dataset:", dataset)
    checked = !dataset.checked;
    if (this.handleZanSwitchChange) {
      this.handleZanSwitchChange({
        checked
      });
    } else {
      console.warn('页面缺少 handleZanSwitchChange 回调函数');
    }
    console.log(" checked", checked)
  },
  handleZanSwitchChange(e) {
    this.setData({
      checked: e.checked
    });
  },
  nameInput: function(e) {
    console.log("name:", e.detail.value)
    var that = this;
    console.log("that:", that)
    that.data.addressDetail.consignee = e.detail.value
    that.setData({
      addressDetail: that.data.addressDetail
    })
  },
  addressInput: function(e) {
    var that = this;
    console.log("address:", e.detail.value)
    that.data.addressDetail.address = e.detail.value
    that.setData({
      addressDetail: that.data.addressDetail
    })
  },
  phoneInput: function(e) {
    var that = this;
    console.log("phone:", e.detail.value)
    that.data.addressDetail.mobile = e.detail.value
    that.setData({
      addressDetail: that.data.addressDetail
    })
  },
  bindRegionChange: function(e) {
    var that = this;
    console.log("address:", e.detail.value)
    that.setData({
      addressDetail: that.data.addressDetail
    })
  },
  //保存按钮
  saveAddress: function() {
    var that = this;
    if (checked == true) {
      checked = 1
    } else {
      checked = 0
    }
    var isDefault = checked;
    if (that.data.addressDetail.addressName != '' && that.data.addressDetail.address != '' && that.data.addressDetail.mobile != '' && that.data.addressDetail.consignee != '') {
      var token = wx.getStorageSync('token'),
        url = api.address.addressUpdate + '?token=' + token + '&id=' + addressId + '&addressName=' + that.data.addressDetail.addressName + '&consignee=' + that.data.addressDetail.consignee + '&address=' + that.data.addressDetail.address + '&mobile=' + that.data.addressDetail.mobile + '&isDefault=' + isDefault;
      toolkit.post(url, (res) => {
        wx.showToast({
          title: '地址修改成功',
          icon: 'success',
          duration: 1000,
          success: function() {
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)

          }
        })
      })
      that.setData({
        addressName: [],
        consignee: '',
        address: '',
        mobile: ''
      })
    } else {
      wx.showToast({
        title: '请填写详细资料',
        icon: 'none'
      })
    }
  }
})