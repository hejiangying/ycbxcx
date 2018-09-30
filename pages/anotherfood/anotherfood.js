
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var goodsId = '', num = 1, goodsPrice = '', recType = '', collectStatus='';//商品id,数量,价格,通用商品标识，是否收藏
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
    goods:'',
    goodsimg:[],
    imgres:[],
    pathList:[],
    collectstatus:'',
    commentlist:[]

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
      url: '../../pages/comments/comments?id=' + goodsId+ '&itemid=' + recType,
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
  getgoodsdetail:function(){
    var that = this,
    token = wx.getStorageSync('token');
    wx.showLoading({
      title: '加载中...',
    })
    var url = api.appGoods.anotherDetail + '?id=' + goodsId+'&token='+token;
    toolkit.get(url,(res) => {
      wx.hideLoading()
      var goods = res.data.result.goodsItem;
      collectStatus = res.data.result.collectStatus;
       var commentlist = res.data.result.commentList;
      goodsPrice = res.data.result.goodsItem.itemPrice
    
      console.log("商品详情：",goods)
      that.setData({
        goods:goods,
        collectstatus: collectStatus,
        commentlist:commentlist
      })
    })
  },
  //立即购买
  buyClick: function () {
    console.log(goodsPrice)
    var that = this;
    var status = that.data.status
    if (status == false) {
      that.setData({
        status: true
      })
    } else {
      wx.navigateTo({
        url: '../../pages/tyyding/tyyding?id=' + goodsId + '&price=' + goodsPrice,
      })
      that.setData({
        status: false
      })
    }
  },
  // 是否收藏该商品
  isCollect: function (e) {
    console.log('zahungtai', collectStatus)
    var that = this,
      productId = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      collentUrl = that.route;
    if (collectStatus == 0) {
      var url = api.collection.save + '?productId=' + productId + '&token=' + token + '&collentUrl=' + collentUrl + '&recType=' + recType;
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
    console.log("option:",options.id)
    goodsId = options.id
    recType = options.itemid
    console.log("参数",recType)
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
    var that = this;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})