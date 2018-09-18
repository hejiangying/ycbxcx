// pages/order/order.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var _order = '',
  recType = [],
  status = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ortp: 1,
    orderList: '',
    orderstatus: '',
    name1:'',
    name2: '',
    name3: '',
    name4:'',
    recType:[],
  },
  // 订单状态的选择
  orderSelect: function(e) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    _order = e.currentTarget.dataset.order;
    var status = ''
    that.setData({
      ortp: _order
    })
    if (that.data.ortp == 2) {
      status = 0
    } else if (that.data.ortp == 3) {
      status = 1
    }
    var token = wx.getStorageSync('token'),
      url = api.order.orderList + '?token=' + token + '&status=' + status;
    toolkit.post(url, (res) => {
      wx.hideLoading()
      var orderlist = res.data.result.content
      that.setData({
        orderList: orderlist
      })
    })
    console.log("url", url)
  },
  //查看详情
  seeDetail: function(e) {
    var that = this;
    console.log("order:", that.data.ortp)
    var goodsid = e.currentTarget.dataset.id;
    var recType = e.currentTarget.dataset.rectype;
    if(recType == 1){//客栈
      console.log("客栈：",recType)
      wx.navigateTo({
        url: '../../pages/seeorder/seeorder?id=' + goodsid,
      })
    }else if(recType == 2){
      console.log("线路：", recType)
      wx.navigateTo({
        url: '../../pages/lineorder/lineorder?id='+goodsid,
      })
    }else if(recType ==3){
      console.log("通用：", recType)
      wx.navigateTo({
        url: '../../pages/anotherdetail/anotherdetail?id=' + goodsid,
      })
    }
    console.log("58585:", recType)
  },
  payClick: function() {
    wx.navigateTo({
      url: '../../pages/buy/checkout/checkout',
    })
  },
  //评论
  commClick: function() {
    wx.navigateTo({
      url: '../../pages/commentPost/commentPost',
    })
  },
  //取消订单
  cancelOrder(e) {
    var that = this;
    var orderid = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      url = api.order.ordercancle + '?token=' + token + '&id=' + orderid;
    console.log("取消订单：", orderid)
    wx.showModal({
      title: '提示',
      content: '是否取消订单？',
      confirmColor:'#f63264',
      success(res) {
        if (res.confirm) {
          toolkit.post(url, (res) => {
            that.getList()
          })
        } else if (res.cancel) {

        }
      }
    })

  },
  onShow: function() {
    var that = this;
    that.getList()
  },
  onLoad: function(options) {
    
  },
  //订单列表
  getList() {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this,
      token = wx.getStorageSync('token'),
      url = api.order.orderList + '?token=' + token;
    toolkit.post(url, (res) => {
      wx.hideLoading()
      var orderlist = res.data.result.content
      for(var i=0;i<orderlist.length;i++){
        var recType = orderlist[i].recType;
        if(orderlist[i].recType == 1){
          var name1 = orderlist[i].ordersHotel.goodsName
          console.log("rectype1:", orderlist[i].recType)
          console.log("rectype555：", name1)
        } else if (orderlist[i].recType == 2) {
          var name2 = orderlist[i].ordersLine.goodsName
          console.log("rectype2:", orderlist[i].recType)
          console.log("rectype555：", name2)
        } else if (orderlist[i].recType == 3) {
          var name3 = orderlist[i].ordersItem.goodsName
          console.log("rectype3:", orderlist[i].recType)
          console.log("rectype555：", name3)
        }else if (orderlist[i].recType == 0) {
          var name4 = orderlist[i].ordersGoods.goodsName
          console.log("rectype3:", orderlist[i].recType)
          console.log("rectype555：", name4)
        }
        that.data.recType.push(recType)
        console.log("666:", that.data.recType)
      }
      that.setData({
        orderList: orderlist,
        name1: name1,
        name2: name2,
        name3: name3,
        name4:name4,
        recType: that.data.recType
      })
    })
  },
  delOrder(e){
    var that = this;
    var orderid = e.currentTarget.dataset.id,
    token = wx.getStorageSync('token'),
    url = api.order.orderDel + '?id=' + orderid+'&token='+token;
    wx.showModal({
      title: '提示',
      content: '确认删除该订单吗？',
      confirmColor:'#f63264',
      success(res){
        if(res.confirm){
          toolkit.post(url, (res) => {
            wx.showToast({
              title: '已删除',
              duration:3000,
              success(){
                that.getList()
              }
            })
          })
        }else if(res.confirm){
        }
      }
    })
  }
})