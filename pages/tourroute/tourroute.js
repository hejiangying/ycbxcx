// pages/tourroute/tourroute.js
const toolkit = require('../../utils/ToolKit.js');
const api = require('../../utils/api.js');
const host = require('../../utils/host.js');
var itemId = '',currentPage=1,totalpage='',sumList=[],isLoadmore=false;//自助游标识，当前页，总页数，总列表,是否加载更多
var sortId = '', isShop = '', isSelfexpense='',filList=[];//排序的索引,是否购物，是否自费,筛选结果
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _way:1,
    linelist:[],//自助游路线列表
    inputcon: '',//搜索内容
    searchList: '',//搜索结果
    typeclass: 1,//1为列表，2为搜索
    issort:false,
    isfiltrate:false,
    sort:1,
    sortList: [{ name: '推荐排序', index: 1 }, { name: '销量最高', index: 2 }, {name: '价格最高', index: 3
    }, {name: '价格最低', index: 4 }, {name: '热门评论', index: 5 }],
    name:'最新',
    menu1:1,//筛选默认目的地
    fitMenu:'',
    optName:'',//选择城市
    date:'',
    searchmask:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    itemId = options.itemId
  },
  tapSelect:function(e){
    var that = this;
    var tourway = e.currentTarget.dataset.way;
    that.setData({
      _way : tourway
    })

  },
  //点击搜索查询
  sortClick(e){
    var that = this;
    var sortindex = e.currentTarget.dataset.sort
    if (sortindex == 1){
      isSelfexpense = '';
      isShop = '';
      if (that.data.issort == false) {
        that.data.issort = true
      } else {
        that.data.issort = false
      }
      that.setData({
        issort: that.data.issort,
        isfiltrate: false,
        sort: 1,
      })
    } else if (sortindex == 2){
      isShop = '';
      isSelfexpense = 0;
      currentPage = 1
      that.setData({
        issort: false,
        isfiltrate: false,
        sort:2
      })
      that.getLine()
    } else if (sortindex == 3) {
      isSelfexpense ='';
      isShop = 0;
      currentPage = 1
      that.setData({
        issort: false,
        isfiltrate: false,
        sort: 3
      })
      that.getLine()
    } else if (sortindex == 4) {
      isSelfexpense = '';
      isShop = '';
      if (that.data.isfiltrate == false) {
        that.data.isfiltrate = true
      } else {
        that.data.isfiltrate = false
      }
      that.setData({
        issort: false,
        sort: 4,
        isfiltrate: that.data.isfiltrate
      })
      that.getLine()
    }
    
  },
  //排序选择
  sortSel(e){
    var that = this;
    var sortIndex = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    console.log(e, sortId)
    sortId = ''
    sortId = sortIndex
    that.getLine()
    that.setData({
      issort: false,
      name:name
    })
  },
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      date: e.detail.value,
    })
  },
  //查看详情
  goDetail:function(e){
    console.log("e:",e)
    var that = this;
    var lineid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/orderdetail/orderdetail?id=' + lineid + '&itemId=' + itemId,
    })
  },
  //筛选菜单
  filClick(e){
    var meindex = e.currentTarget.dataset.me;
    var that = this;
    this.setData({
      menu1: meindex
    })
    if (that.data.menu1 == 1){

    }else if(that.data.menu1 == 2){
     
    }else if(that.data.menu1 == 3){
      var nowdate = new Date()
      var seperator1 = "-";
      var year = nowdate.getFullYear();
      var month = nowdate.getMonth() + 1;
      var strDate = nowdate.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      console.log(currentdate)
      that.setData({
        date: currentdate
      })
    }
  },
  getCity(){
    var that = this;
    let url = api.appLine.filtrate
    toolkit.get(url, res => {
      console.log("返回：", res)
      that.setData({
        fitMenu: res.data.result
      })
    })
  },
  //具体城市选择
  optClick(e){
    var that = this;
    var city = e.currentTarget.dataset.opt
    if (that.data.menu1 == 1){
      let url = api.appLine.linelist + '?overCity=' + city
      toolkit.get(url, (res) => {
        filList = []
        filList=res.data.result.content
        that.setData({
          optName:city
        })
      })
      console.log('城市：', that.data.optName,1, city)
    } else if (that.data.menu1 == 2){
      console.log("条件2")
      let url = api.appLine.linelist + '?startCity=' + city
      toolkit.get(url, (res) => {
        filList=[]
        filList = res.data.result.content
        that.setData({
          optName: city
        })
      })
    }
   
  },
  //点击确定
  confirmBtn(){
    var that = this
    console.log("筛选结果", filList)
    that.setData({
      linelist:filList,
      isfiltrate: false,
    })
    console.log("kong:", that.data.menu1, that.data.date)
    if(that.data.menu1==3 && that.data.date != ''){
      let url = api.appLine.linelist + '?beginDate=' + that.data.date
      toolkit.get(url,res=>{
       that.setData({
         linelist:res.data.result.content
       })
      })
    }
  },
  //获取列表
  getLine:function(){
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    var url = api.appLine.linelist + '?pageNumber=' + currentPage + '&sortfield=' + sortId + '&isSelfexpense=' + isSelfexpense + '&isShop=' + isShop;
    toolkit.get(url,(res)=>{
      wx.hideLoading()
      wx.stopPullDownRefresh()
      console.log("res444:",res)
      var linelist = res.data.result.content;
      console.log("是否加载更多：", isLoadmore)
      if(isLoadmore == true){
        console.log("jiazaigebgduo ")
        sumList = sumList.concat(linelist)
      }else{
        sumList = linelist
        console.log("buyong ")
      }
      totalpage = res.data.result.totalPages
      console.log("sumList:", sumList)
      that.setData({
        linelist: sumList
      })
    })
  },
  //恢复默认
  nofil(){
    console.log('optName')
    var city = '';
    let url = api.appLine.linelist + '?overCity=' + city
    toolkit.get(url,res=>{
      this.setData({
        optName: '',
      })
    })
  },
  //取消
  cancelClick(){
    this.setData({
      isfiltrate:false
    })
  },
  //点击蒙版
  closeMask(){
    this.setData({
      isfiltrate: false,
      issort:false
    })
  },
  //获取输入的内容
  getcon(e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      inputcon: e.detail.value,
      searchmask:true
    })
  },
  showClick(){
    var that = this;
    that.setData({
      searchmask: true
    })
  },
  //搜索
  searchClick() {
    var that = this;
    var overCity = that.data.inputcon, url = api.appLine.linelist + '?overCity=' + overCity;
    if(overCity !=''){
      toolkit.get(url, (res) => {
        var searchList = res.data.result.content
        that.setData({
          searchList: searchList,
          foodList: '',
          typeclass: 2,
          searchmask: false
        })
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '搜索内容不能为空',
      })
    }
   
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
    // sortId=''
    that.getLine()
    that.getCity()
    that.setData({
      host:host
    })
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
    var that = this;
    isLoadmore=false
    currentPage = 1
    that.getLine()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if(currentPage != totalpage){
      currentPage++
      console.log("当前页：", currentPage)
      isLoadmore = true
      that.getLine()
    }else{
      wx.showLoading({
        title: '没有更多了',
        success:()=>{
          setTimeout(function(){
            wx.hideLoading()
          },3000)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})