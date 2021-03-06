const toolkit = {
  // 网络请求的get方式
  get: function () {
    var len = arguments.length;
    if (2 == len) {
      this.networkRequest(arguments[0], 'GET', {}, arguments[1], null)
    } else if (3 == len) {
      this.networkRequest(arguments[0], 'GET', arguments[1], arguments[2], null)
    } else if (4 == len) {
      this.networkRequest(arguments[0], 'GET', arguments[1], arguments[2], arguments[3])
    }
  },
  // 网络请求的post方式
  post: function () {
    var len = arguments.length;
    if (2 == len) {
      this.networkRequest(arguments[0], 'POST', {}, arguments[1], null)
    } else if (3 == len) {
      this.networkRequest(arguments[0], 'POST', arguments[1], arguments[2], null)
    } else if (4 == len) {
      this.networkRequest(arguments[0], 'POST', arguments[1], arguments[2], arguments[3])
    }
  },
  networkRequest: function (url, method, data, callBack, failback) {
    wx.request({
      url: url,
      method: method,
      data: data,
      success: callBack,
      fail: failback != null ? failback : function (res) {
        // wx.showToast({
        //   title: '网络异常'
        // })
      }
    })
  },
  showToast: function (msg) {
    wx.showToast({
      title: msg,
      mask: true
    });
  },
  hideToast: function () {
    wx.hideToast();
  },
  showLoading: function () {
    wx.showLoading({
      title: '正在提交...',
      mask: true
    });
  },
  hideLoading: function () {
    wx.hideLoading();
  }
};
module.exports = toolkit;