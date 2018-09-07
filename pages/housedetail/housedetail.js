// pages/fooddetail/fooddetail.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var goodsId = '', itemId= '';//商品id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xc: 1, //默认选择行程介绍
    iscol: false, //默认不收藏该商品
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    status: false,
    _type: '',
    goods: '',
    goodsimg: [],
    imgres: []

  },
  xcSelect: function (e) {
    var that = this;
    var _xc = e.currentTarget.dataset.xc
    that.setData({
      xc: _xc
    })
  },
  // 是否收藏该商品
  isCollect: function () {
    var that = this,
      _iscol = "";
    if (that.data.iscol == false) {
      _iscol = true
    } else {
      _iscol = false
    }
    that.setData({
      iscol: _iscol
    })
  },
  // 查看评论
  commSee: function () {
    wx.navigateTo({
      url: '../../pages/comments/comments',
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
      // if (that.data._type == '') {
      //   wx.showToast({
      //     title: '请选择款式',
      //     icon: 'none'
      //   })
      // } else {
      that.setData({
        status: false
      })
      wx.navigateTo({
        url: '/pages/buy/checkout/checkout',
      })
      // }

    }
  },
  //款式选择
  typeClick: function (e) {
    var that = this;
    var _type = e.currentTarget.dataset.id
    console.log("222:", _type)
    that.setData({
      _type: _type
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
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
  bindPlus: function () {
    var num = this.data.num;
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
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  closeClick: function () {
    var that = this;
    var status = that.data.status
    that.setData({
      status: false
    })

  },
  //获取商品详情
  getgoodsdetail: function () {
    var that = this;
    console.log("goodsId:", goodsId)
    var url = api.appHotel.housedetail + '?id=' + goodsId;
    toolkit.get(url, function (res) {
      var goods = res.data.result
      console.log("商品详情：", goods)
      var goodsimg = goods.litpic;
      var reg = /,$/gi;
      var img = goodsimg.replace(reg, '')
      var imgres = img.split(",")
      that.setData({
        goods: goods,
        imgres: imgres
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("option:", options.id)
    goodsId = options.id
    itemId = option.itemId
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
    that.getgoodsdetail()
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

  }
})