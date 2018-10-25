// pages/booking/booking.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../..//utils/api.js');
var itemId = '',lineid='',price='',Num='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _date: '',
    minusStatuses: ['disabled', 'disabled', 'disabled'], //input的默认样式
    totalCount: 0, //订购数量总计默认为0
    _name: [], //姓名
    _ids: [], //身份证号码
    _totalCount: [], //不同类型的订购数量
    totalPrice: 0, //订购总价默认为0
    status:false,//默认身份证号码错误
    peritem: [{
        per: "价格",
        price: '',
        num: 0
      }
    ],
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    itemId = options.itemid
    lineid = options.lineid
    price = options.price
  },
  // 日期选择
  dateSel: function(e) {
    var that = this;
    console.log("e.detail",e.detail.value)
    var _date = that.data._data
    
    that.setData({
      _date: e.detail.value
    })
    console.log("_data:", _date)
  },
  bindRegionChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      region: e.detail.value
    })
  },
  /* 点击减号 */
  bindMinus: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index)
    var num = that.data.peritem[index].num;
    var lists = this.data.lists;
    // 如果大于1时，才可以减
    if (num > 0) {
      num--;
      lists.pop(); //删除lists数组内容
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 0 ? 'disabled' : 'normal';
    var peritem = that.data.peritem;
    peritem[index].num = num;
    var minusStatuses = that.data.minusStatuses;
    minusStatuses[index] = minusStatus;
    that.setData({
      peritem: peritem,
      minusStatuses: minusStatuses,
      lists: lists
    });
    Num = num
    that.calculateTotal()
  },
  /* 点击加号 */
  bindPlus: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index)
    var num = that.data.peritem[index].num;
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 0 ? 'disabled' : 'normal';
    var peritem = that.data.peritem;
    peritem[index].num = num;
    var minusStatuses = that.data.minusStatuses;
    minusStatuses[index] = minusStatus;

    var lists = that.data.lists;
    var newData = {
      name: "",
      ids: ""
    };
    lists.push(newData); //添加lists数组内容，使for循环多一次
    that.setData({
      peritem: peritem,
      minusStatuses: minusStatuses,
      lists: lists
    });
    Num = num
    that.calculateTotal()
  },
  //计算总量
  // calculateTotal: function() {
  //   var that = this;
  //   var peritem = that.data.peritem;
  //   for (var i = 0; i < peritem.length; i++) {
  //     var _totalCount = that.data._totalCount;
  //     _totalCount.push(peritem[i].num)
  //   }
  //   if (_totalCount.length > 3) {
  //     _totalCount.splice(0, 3)
  //     var totalCount = 0;
  //     var totalMoney = 0;
  //     for (var j = 0; j < _totalCount.length; j++) {
  //       totalCount += _totalCount[j];
  //       totalMoney = _totalCount[0] * that.data.peritem[0].price + _totalCount[1] * that.data.peritem[1].price + _totalCount[2] * that.data.peritem[2].price
  //     }
  //     that.setData({
  //       totalCount: totalCount,
  //       totalPrice: totalMoney
  //     })
  //   } else {
  //     if (_totalCount[0] == 1) {
  //       totalMoney = that.data.peritem[0].price
  //     } else if (_totalCount[1] == 1) {
  //       totalMoney = that.data.peritem[1].price
  //     } else {
  //       totalMoney = that.data.peritem[2].price
  //     }
  //     that.setData({
  //       totalCount: 1,
  //       totalPrice: totalMoney
  //     })
  //   }
  // },

  calculateTotal(){
    var that = this;
    that.setData({
      totalCount: Num,
      totalPrice: (price * Num).toFixed(2)
    })
  },

  //获取输入的真实姓名
  getName: function(e) {
    var that = this;
    console.log("e:", e)
    console.log("nickname:", e.detail.value)
    var lists = that.data.lists;
    var nickname = e.detail.value;
    var index = e.currentTarget.dataset.index;
    that.data.lists[index].name = nickname;
    that.setData({
      lists: lists
    });
  },
  //获取身份证号码
  getId: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var myid = e.detail.value
    console.log("myid:", e.detail.value)
    console.log("e:",e)
    var lists = that.data.lists
    that.data.lists[index].ids = myid
    that.setData({
      lists: lists
    });
  },
  //跳转到下单页面
  goPay: function() {
    var that = this;
    var lists = that.data.lists;
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    for (var m = 0; m < that.data.lists.length; m++) {
      var _name = that.data._name
      var _ids = that.data._ids
      _name.push(lists[m].name)
      _ids.push(lists[m].ids)

    }
    //姓名数组去空和去重
    for (var a = 0, len = that.data._name.length; a < len; a++) {
      for (var b = a + 1; b < len; b++) {
        if (!that.data._name[a] || that.data._name[a] == '' || that.data._name[a] === undefined) {
          !that.data._name.splice(a, 1);
          len--;
          a--;
        } else if (_name[a] == _name[b]) {
          _name.splice(b, 1)
          b--
        }
      }
    }
    //身份证数组去空和去重和校验
    for (var x = 0, leng = that.data._ids.length; x < leng; x++) {
      console.log("首先执行：", that.data._ids[x])
      if (!that.data._ids[x] || that.data._ids[x] == '' || that.data._ids[x] === undefined) {
        console.log("有未填写的身份证号码1111");
        !that.data._ids.splice(x, 1);
        leng--;
        x--;
      } else if (that.data._ids.length > that.data.lists.length) {
        console.log("需要处理_ids,走下一个for循环");
        console.log("_ids2222:", that.data._ids.length )
        console.log("lists2222:", that.data.lists.length)
        
      } else if (that.data._ids.length < that.data.lists.length){
        console.log("有未填写的身份证号码2222");
        wx.showToast({
          title: '有未填写的身份证信息',
          icon: 'none'
        })
      } else if (!regIdNo.test(that.data._ids[x])) {
        var status = false;
        console.log("身份证信息校验未通过3333");
        !that.data._ids.splice(x, 1);
        leng--;
        x--;
      } else if (regIdNo.test(that.data._ids[x])){
        console.log("身份证信息校验通过4444");
        var status = true;
      }
      for (var y = x + 1; y < leng; y++) {
        if (_ids[x] == _ids[y]) {
          console.log("身份证信息校验未通过555555")
          _ids.splice(y, 1)
          y--
        }

      }
    }
    if (that.data.totalCount == 0) {
      console.log('未选择购买数量')
      wx.showToast({
        title: '请选择购票类型和数量',
        icon: 'none'
      })
    } else if (that.data.lists.length == 1) {
      console.log("只有一个人a：", that.data.lists)
      if (that.data.lists[0].ids == "" || that.data.lists[0].name == "") {
        console.log("单人市信息为空")
        wx.showToast({
          title: '请填写个人信息登记',
          icon: 'none'
        })
      } else if (that.data._date == '') {
        wx.showToast({
          title: '请选择游玩日期',
          icon: 'none'
        })
      } else if(status == false){
        console.log("身份证信息校验未通过6666")
        wx.showToast({
          title: '身份证信息校验未通过',
          icon: 'none'
        })
      } else {
        that.setData({
          _ids:[],
          _name:[]
        })
        var token = wx.getStorageSync('token');
        var params = that.data.lists;
        var url = api.order.orderline + '?lineId=' + lineid + '&playTime=' + that.data._date + '&lineNum=' + that.data.totalCount + '&toalFee=' + that.data.totalPrice + '&token=' + token;
        toolkit.post(url,params,(res)=>{
          wx.showToast({
            title: '预订成功',
            duration: 1000,
            success() {
              wx.switchTab({
                url: '/pages/order/order',
              })
            }
          })
        })
      }
    } else if (that.data.lists.length != 1) {
      if (that.data._name.length != that.data.lists.length || that.data._ids.length != that.data.lists.length) {
        wx.showToast({
          title: '请输入合法的身份证信息',
          icon: 'none'
        })
      } else {
        that.setData({
          _ids:[],
          _name:[]
        })
        // console.log("lists",that.data.lists.toSting())
        var token = wx.getStorageSync('token');
        var params = that.data.lists;
        var url = api.order.orderline + '?lineId=' + lineid + '&playTime=' + that.data._date + '&lineNum=' +  that.data.totalCount + '&toalFee=' + that.data.totalPrice +'&token='+token;
        toolkit.post(url,params,(res)=>{
          wx.showToast({
            title: '预订成功',
            duration:1000,
            success(){
              wx.switchTab({
                url: '/pages/order/order',
              })
            }
          })
        })
        // wx.navigateTo({
        //   url: '../../pages/shopping/shopping?itemid=' + itemId,
        // })
      }

    }
  },
  getPrice(){
    var that = this;
    that.setData({
      price: price
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
    var that = this;
    that.getPrice()
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