// pages/ucenter/addressAdd/addressAdd.js
const toolkit = require('../../../utils/ToolKit.js');
const api = require('../../../utils/api.js');
var checked = false;//设为默认地址
Page(
  {
    /**
     * 页面的初始数据
     */
    data: {
      // checked: false,
      addressName:[],
      consignee:'',
      address:'',
      mobile:'',
      isDefault:''
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
      console.log(" checked",checked)
    },
    handleZanSwitchChange(e) {
      this.setData({
        checked: e.checked
      });
    },
    nameInput:function(e){
      console.log("name:",e.detail.value)
      var that = this;
      that.setData({
        consignee:e.detail.value
      })
    },
    addressInput:function(e){
      var that =this;
      console.log("address:", e.detail.value)
      that.setData({
        address:e.detail.value
      })
    },
    phoneInput:function(e){
      var that = this;
      console.log("phone:", e.detail.value)
      that.setData({
        mobile:e.detail.value
      })
    },
    bindRegionChange:function(e){
      var that = this;
      console.log("address:", e.detail.value)
      that.setData({
        addressName:e.detail.value
      })
    },
    
    saveAddress: function () {
      var that = this;
      if(checked == true){
        checked=1
      }else{
        checked=0
      }
      var isDefault = checked;
      console.log("8989:",isDefault)
      console.log("1", that.data.addressName)
      console.log("2", that.data.address)
      console.log("3", that.data.mobile)
      console.log("4", that.data.consignee)
      if (that.data.addressName != '' && that.data.address != '' && that.data.mobile != '' && that.data.consignee != ''){
        var token = wx.getStorageSync('token'),
          url = api.address.addressAdd + '?token=' + token + '&addressName=' + that.data.addressName + '&consignee=' + that.data.consignee + '&address=' + that.data.address + '&mobile=' + that.data.mobile + '&isDefault=' + isDefault;
        toolkit.post(url, (res) => {
          wx.showToast({
            title: '地址创建成功',
            icon: 'success'
          })
        })
        that.setData({
          addressName:[],
          consignee:'',
          address:'',
          mobile:''
        })
      }else{
        wx.showToast({
          title: '请填写详细资料',
          icon:'none'
        })
      }
    }
  })