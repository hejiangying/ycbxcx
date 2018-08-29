
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = decodeURIComponent(options.url);
    this.setData({
      url: url
    })
  },
  getUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:ok') {
      wx.switchTab({
        url: '../../pages/index/index',
      })
     } else {
      wx.showToast({
        title: '请授权后再访问小程序',
        image:'../../image/clear.png'
      })
       this.getSetting();

     }
  },
  getSetting: function (e) {
    wx.openSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"] == true) {
          auth.login(this.data.url);
        } else {
          this.getSetting();
        }
      }
    });
  },

})