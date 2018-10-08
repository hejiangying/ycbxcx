// pages/fooddetail/fooddetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var goodsId = '',
  num = 1,
  goodsPrice = '',
  itemId = '',
  collectStatus = ''; //商品id,数量,价格,,收藏状态
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xc: 1, //默认选择行程介绍
    iscol: '', //默认不收藏该商品
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    status: '',
    _type: '',
    goods: '',
    goodsimg: [],
    imgres: [],
    pathList: [],
    collectstatus: '', //收藏

  },
  xcSelect: function(e) {
    var that = this;
    var _xc = e.currentTarget.dataset.xc
    that.setData({
      xc: _xc
    })
  },
  // 查看评论
  commSee() {
    var that = this;
    wx.navigateTo({
      url: '../../pages/comments/comments?id=' + goodsId + '&itemid=' + itemId,
    })
  },
  
  //款式选择
  typeClick: function(e) {
    var that = this;
    var _type = e.currentTarget.dataset.id
    console.log("222:", _type)
    that.setData({
      _type: _type
    })
  },
  /* 点击减号 */
  bindMinus: function() {
    // var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function() {
    // var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  closeClick: function() {
    var that = this;
    var status = that.data.status
    that.setData({
      status: false
    })

  },
  //获取商品详情
  getgoodsdetail: function() {
    var that = this,
      token = wx.getStorageSync('token');
    wx.showLoading({
      title: '加载中...',
    })
    var url = api.appGoods.goodsdetail + '?id=' + goodsId + '&token=' + token;
    toolkit.get(url, (res) => {
      wx.hideLoading()
      var goods = res.data.result.goods,commentlist = res.data.result.commentList;
      collectStatus = res.data.result.collectStatus;
      goodsPrice = res.data.result.goods.marketPrice
      console.log("商品详情：", goods)
      // var goodsimg = goods.goodsImg;
      // var reg = /,$/gi;
      // var img = goodsimg.replace(reg, '')
      // var imgres = img.split(",")
      that.setData({
        goods: goods,
        // imgres: imgres,
        collectstatus: collectStatus,
        commentlist:commentlist
      })
    })
  },
  //立即购买
  buyClick: function () {
    var that = this;
    var status = that.data.status
    if (status == false) {
      that.setData({
        status: true
      })
    } else {
      var token = wx.getStorageSync('token'),
        goodsNumber = num,
        url = api.shop.addShop + '?goodsId=' + goodsId + '&token=' + token + '&recType=' + itemId+'&goodsNumber=' + that.data.num;
      console.log("url", url)
      toolkit.post(url, (res) => {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      })
      that.setData({
        status: false
      })
      // wx.navigateTo({
      //   url: '/pages/buy/checkout/checkout',
      // })

    }
  },
  // 是否收藏该商品
  isCollect: function(e) {
    console.log('zahungtai',collectStatus)
    var that = this,
      productId = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      collentUrl = that.route;
    if (collectStatus == 0) {
      var url = api.collection.save + '?productId=' + productId + '&token=' + token + '&price=' + that.data.goods.marketPrice + '&productName=' + that.data.goods.goodsName + '&collentUrl=' + collentUrl + '&recType=' + itemId;
      toolkit.post(url, (res) => {
        console.log("收藏成功")
        wx.showToast({
          title: '收藏成功',
        })
        that.setData({
          collectstatus: 1
        })
      })
      collectStatus = 1
    } else if (collectStatus == 1) {
      var reurl = api.collection.remove + '?productId=' + productId + '&token=' + token;
      toolkit.post(reurl, (res) => {
        console.log("取消收藏")
        wx.showToast({
          title: '取消成功',
        })
        that.setData({
          collectstatus: 0
        })
      })
      collectStatus = 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("option:", options)
    goodsId = options.id
    itemId = options.itemId
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
    var that = this;
    that.getgoodsdetail()
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