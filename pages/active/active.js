// pages/active/active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _conlist: [],
    marks: [],
    maplist: [{
        id: 1,
      latitude: 25.586326,
      longitude: 100.227953,
        title: '大关邑哈哈',
        iconPath: '',
        callout: {
          content: '大关邑商业街',
        }
      },
      {
        id: 2,
        latitude: 25.586326,
        longitude: 100.233906,
        title: '大关邑村委会', 
        iconPath: '',
        callout: {
          content: '这是111',
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          longitude: longitude,
          latitude: latitude
        })

        var marklist = that.data.maplist;
        var marks = that.data.marks;
        for (var i = 0; i < marklist.length; i++) {
          marks.push({})
          marks[i].id = marklist[i].id
          marks[i].iconPath = '/image/addr.png'
          marks[i].latitude = marklist[i].latitude

          marks[i].longitude = marklist[i].longitude
          marks[i].callout = {
            content: '22',
            borderRadius: 3,
            padding: 5,
            fontSize: 10,
            // bgColor: '#e37fb0',
            display: 'ALWAYS'
          }
          marks[i].title = marklist[i].title
          var conlist = that.data._conlist;
          for (var j = i; j < marklist.length; j++) {
            conlist.push(marklist[j].callout.content) 
          }
          marks[i].callout.content = conlist[i]
        }
        that.setData({
          markers: marks
        })
      }
    });
  },
  addrClick:function(){
    wx.navigateTo({
      url: '../../pages/goodsdetail/goodsdetail',
    })
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