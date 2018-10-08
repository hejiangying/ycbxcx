// pages/order/order.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var _order = '',
  recType = [],
  status = '', //订单状态
  currentPage = 1, //当前页
  totalpage = '', //总页数
  sumList = [], //总列表数
  isLoadmore = false, //是否需要加载更多
  currentSel = '', //当前选择
  name = [], //商品名称
  anotherList = [], //其他状态的列表
  anotherName = [], //其他状态的订单名字列表
  times = 0, //从其他页面初始进入订单页为0
  Status = ''; //当前状态
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ortp: 0, //默认全部订单
    orderList: '',
    orderstatus: '',
    name: [],
    recType: [],
    statusList: ['全部订单', '待付款订单', '待评价', '退款/售后']
  },
  // 订单状态的选择
  orderSelect: function(e) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    _order = e.currentTarget.dataset.order;
    console.log(_order)
    currentSel = _order;
    var status = ''
    that.setData({
      ortp: _order
    })
    if (that.data.ortp == 1) {
      status = 0
    } else if (that.data.ortp == 2) {
      status = 1
    } else if (that.data.ortp == 3) {
      status = 2
    }
    currentPage = 1
    Status = status
    var token = wx.getStorageSync('token'),
      url = api.order.orderList + '?token=' + token + '&status=' + status + '&pageNumber=' + currentPage;
    toolkit.post(url, (res) => {
      wx.hideLoading()
      var orderlist = res.data.result.content
      if (orderlist.length > 0) {
        anotherName = []
        var name2 = [];
        for (var i in orderlist) {
          var recType = orderlist[i].recType;
          if (orderlist[i].ordersLineList) {
            name2[i] = orderlist[i].ordersLineList[0].goodsName
          }
          if (orderlist[i].ordersHotelList) {
            name2[i] = orderlist[i].ordersHotelList[0].goodsName
          }
          if (orderlist[i].ordersItemList) {
            name2[i] = orderlist[i].ordersItemList[0].goodsName
          }
          if (orderlist[i].ordersGoodsList) {
            name2[i] = orderlist[i].ordersGoodsList[0].goodsName
          }
          that.data.recType.push(recType)
        }
        if (isLoadmore == true) {
          anotherList = anotherList.concat(orderlist)
          anotherName = anotherName.concat(name2)
        } else {
          anotherList = orderlist
          anotherName = name2
        }
        that.setData({
          orderList: anotherList,
          name: anotherName
        })
      } else if (orderlist.length == 0) {

      }
      anotherList = orderlist
      that.setData({
        orderList: anotherList
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
    if (recType == 2) { //客栈
      console.log("客栈：", recType)
      wx.navigateTo({
        url: '../../pages/seeorder/seeorder?id=' + goodsid,
      })
    } else if (recType == 3) {
      console.log("线路：", recType)
      wx.navigateTo({
        url: '../../pages/lineorder/lineorder?id=' + goodsid,
      })
    } else if (recType == 4) {
      console.log("通用：", recType)
      wx.navigateTo({
        url: '../../pages/anotherdetail/anotherdetail?id=' + goodsid,
      })
    } else if (recType == 1) {
      console.log("特产：", recType)
      wx.navigateTo({
        url: '../../pages/specialty/specialty?id=' + goodsid,
      })
    }
    console.log("58585:", recType)
    times = 1
  },
  //立即支付
  payClick: function(e) {
    var orderId = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      url = api.buy.buy + '?orderId=' + orderId + '&token=' + token;
    toolkit.post(url, (res) => {
      var newres = res.data.result
      wx.requestPayment({
        'timeStamp': res.data.result.timeStamp,
        'nonceStr': res.data.result.nonceStr,
        'package': res.data.result.package,
        'signType': 'MD5',
        'paySign': res.data.result.paySign,
        'success': function(res) {
          // console.log(res)
          // toolkit.post(api.buy.buyok, newres,(res)=>{
          //   console.log(989898)
          // })
        },
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
  //申请退款
  refundClick(e) {
    var that = this;
    var refundId = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      url = api.buy.refund + '?orderId=' + refundId + '&token=' + token;
    wx.showModal({
      title: '提示',
      content: '是否申请退款？',
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
  //确认收货
  confirmOrder(e) {
    var that = this;
    var confirmId = e.currentTarget.dataset.id,
      token = wx.getStorageSync('token'),
      url = api.buy.confirm + '?token=' + token + '&orderId=' + confirmId;
    wx.showModal({
      title: '提示',
      content: '是否确认收货？',
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
    if (times == 0) {
      that.getList()
    }

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
      url = api.order.orderList + '?token=' + token + '&pageNumber=' + currentPage;
    toolkit.post(url, (res) => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      var orderlist = res.data.result.content;
      totalpage = res.data.result.totalPages
      if (orderlist.length > 0) {
        var name1 = [];
        for (var i in orderlist) {
          var recType = orderlist[i].recType;
          if (orderlist[i].ordersLineList) {
            name1[i] = orderlist[i].ordersLineList[0].goodsName
          }
          if (orderlist[i].ordersHotelList) {
            name1[i] = orderlist[i].ordersHotelList[0].goodsName
          }
          if (orderlist[i].ordersItemList) {
            name1[i] = orderlist[i].ordersItemList[0].goodsName
          }
          if (orderlist[i].ordersGoodsList) {
            name1[i] = orderlist[i].ordersGoodsList[0].goodsName
          }
          that.data.recType.push(recType)
        }
        if (isLoadmore == true) {
          sumList = sumList.concat(orderlist)
          name = name.concat(name1)
        } else {
          sumList = orderlist
          name = name1
        }
        that.setData({
          orderList: sumList,
          name: name
        })
      } else if (orderlist.length == 0) {

      }
    })
  },
  //删除订单
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
  onPullDownRefresh: function() {
    var that = this;
    isLoadmore = false
    currentPage = 1
    if(that.data.ortp ==0 ){
      that.getList()
    }else{
      
    }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    if (currentPage != totalpage) {
      currentPage++
      isLoadmore = true
      if (that.data.ortp == 0) {
        that.getList()
      } else {
        that.setData({
          ortp: currentSel
        })
        var token = wx.getStorageSync('token'),
          url = api.order.orderList + '?token=' + token + '&status=' + Status + '&pageNumber=' + currentPage;;
        toolkit.post(url, (res) => {
          wx.hideLoading()
          var orderlist = res.data.result.content;
          var name3 = [];
          for (var i in orderlist) {
            var recType = orderlist[i].recType;
            if (orderlist[i].ordersLineList) {
              name3[i] = orderlist[i].ordersLineList[0].goodsName
            }
            if (orderlist[i].ordersHotelList) {
              name3[i] = orderlist[i].ordersHotelList[0].goodsName
            }
            if (orderlist[i].ordersItemList) {
              name3[i] = orderlist[i].ordersItemList[0].goodsName
            }
            if (orderlist[i].ordersGoodsList) {
              name3[i] = orderlist[i].ordersGoodsList[0].goodsName
            }
            that.data.recType.push(recType)
          }
          anotherList = anotherList.concat(orderlist)
          anotherName = anotherName.concat(name3)
          that.setData({
            orderList: anotherList,
            name: anotherName
          })
        })
      }

    } else {
      wx.showLoading({
        title: '没有更多了',
        success: () => {
          setTimeout(function() {
            wx.hideLoading()
          }, 1000)
        }
      })
    }
  },
})