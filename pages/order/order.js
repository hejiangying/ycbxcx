// pages/order/order.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var _order = '',
  recType = [],
  status = '',//订单状态
  currentPage=1,totalpage='',sumList=[],isLoadmore=false;//当前页，总页数，总列表数，是否需要加载更多
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ortp: 1, //默认全部订单
    orderList: '',
    orderstatus: '',
    name: [],
    name1: '',
    name2: '',
    name3: '',
    name4: '',
    recType: [],
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
    if (recType == 1) { //客栈
      console.log("客栈：", recType)
      wx.navigateTo({
        url: '../../pages/seeorder/seeorder?id=' + goodsid,
      })
    } else if (recType == 2) {
      console.log("线路：", recType)
      wx.navigateTo({
        url: '../../pages/lineorder/lineorder?id=' + goodsid,
      })
    } else if (recType == 3) {
      console.log("通用：", recType)
      wx.navigateTo({
        url: '../../pages/anotherdetail/anotherdetail?id=' + goodsid,
      })
    } else if (recType == 0) {
      console.log("特产：", recType)
      wx.navigateTo({
        url: '../../pages/specialty/specialty?id=' + goodsid,
      })
    }
    console.log("58585:", recType)
  },
  payClick: function(e) {
    var orderId = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      url = api.buy.buy + '?orderId=' + orderId + '&token=' + token;
    toolkit.post(url, (res) => {
      wx.requestPayment({
        'timeStamp': res.data.result.timeStamp,
        'nonceStr': res.data.result.nonceStr,
        'package': res.data.result.package,
        'signType': 'MD5',
        'paySign': res.data.result.paySign,
        'success': function(res) {},
        'fail': function(res) {}
      })

    })


  },
  //评论
  commClick: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/commentPost/commentPost?id=' + id,
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
      confirmColor: '#f63264',
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
      url = api.order.orderList + '?token=' + token+'&pageNumber='+currentPage;
    toolkit.post(url, (res) => {
      wx.hideLoading()
      wx: wx.stopPullDownRefresh()
      var orderlist = res.data.result.content;
      totalpage= res.data.result.totalPages
      if (orderlist.length > 0) {
        var name = [];
        for (var i in orderlist) {
          var recType = orderlist[i].recType;
          if (orderlist[i].ordersLineList) {
            name[i] = orderlist[i].ordersLineList[0].goodsName
          }
          if (orderlist[i].ordersHotelList) {
            name[i] = orderlist[i].ordersHotelList[0].goodsName
          }
          if (orderlist[i].ordersItemList) {
            name[i] = orderlist[i].ordersItemList[0].goodsName
          }
          if (orderlist[i].ordersGoodsList) {
            name[i] = orderlist[i].ordersGoodsList[0].goodsName
          }
          that.data.recType.push(recType)
        }
        if(isLoadmore==true){
          sumList = sumList.concat(orderlist)
        }else{
          sumList = orderlist
        }
        that.setData({
          orderList: orderlist,
          name: name
        })
      } else if (orderlist.length == 0) {

      }
    })
  },
  delOrder(e) {
    var that = this;
    var orderid = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      url = api.order.orderDel + '?id=' + orderid + '&token=' + token;
    wx.showModal({
      title: '提示',
      content: '确认删除该订单吗？',
      confirmColor: '#f63264',
      success(res) {
        if (res.confirm) {
          toolkit.post(url, (res) => {
            wx.showToast({
              title: '已删除',
              duration: 3000,
              success() {
                that.getList()
              }
            })
          })
        } else if (res.confirm) {}
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    isLoadmore = false
    currentPage = 1
    that.getList() 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (currentPage != totalpage) {
      currentPage++
      isLoadmore = true
      that.getList() 
    } else {
      wx.showLoading({
        title: '没有更多了',
        success: () => {
          setTimeout(function () {
            wx.hideLoading()
          }, 3000)
        }
      })
    }
  },
})
