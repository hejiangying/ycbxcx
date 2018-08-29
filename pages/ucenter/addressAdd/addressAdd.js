// pages/ucenter/addressAdd/addressAdd.js
Page(
  {
    /**
     * 页面的初始数据
     */
    data: {
      checked: true,//设为默认地址
      region: ['云南省', '大理白族自治州', '大理市'],//地址
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

      var checked = !dataset.checked;
      var loading = dataset.loading;
      var disabled = dataset.disabled;
      var componentId = dataset.componentId;

      if (loading || disabled) return;



      if (this.handleZanSwitchChange) {
        this.handleZanSwitchChange({
          checked,
          componentId
        });
      } else {
        console.warn('页面缺少 handleZanSwitchChange 回调函数');
      }
    },
    handleZanSwitchChange(e) {
      this.setData({
        checked: e.checked
      });
    },
    
    saveAddress: function () {
      wx.navigateBack({
        delta: 1,
      })
    }
  })