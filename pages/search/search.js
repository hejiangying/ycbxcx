// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeyword: [
      {
        keyword: '巴厘岛',
        isHot: true
      },
      {
        keyword: '海舌公园',
        isHot: true
      },
      {
        keyword: '大理古镇',
        isHot: false
      }
    ],
    keyword: '',
    searchStatus: false,
    currentSortType: 'default',
    currentSortOrder: '',
    goodsList: [
      {
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534156447499&di=4623ca7551caa8cbf63b80470bc80d35&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F5bafa40f4bfbfbedc5597ab474f0f736aec31ffc.jpg',
        name: '大理360度洱海旅拍一日游',
        price: '196.00'
      },
      {
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534156574253&di=0db6158317658b2a52b5b41b8b6ef187&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D179065729%2C278521353%26fm%3D214%26gp%3D0.jpg',
        name: '双廊半日游',
        price: '119.00'
      },
      {
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534156522198&di=6f617a2dbce6e540811aeb1386590f85&imgtype=0&src=http%3A%2F%2Ff6.topitme.com%2F6%2Fdc%2F6f%2F11276631367c66fdc6o.jpg',
        name: '小普陀半日游',
        price: '149.00'
      },
      {
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534156549083&di=f6444612f2d85571416576024bdc1a9a&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fcartoon%2FDavid_Lanham_Illustration%2Fwallpapers%2F1280x800%2Fspacedoggy.jpg',
        name: '海舌公园一日游',
        price: '249.00'
      },
      {
        picUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534156574253&di=0db6158317658b2a52b5b41b8b6ef187&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D179065729%2C278521353%26fm%3D214%26gp%3D0.jpg',
        name: '明信片',
        price: '9.90'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '搜索'
    })
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

  },
  onKeywordConfirm: function (e) {
    //开始搜索
    this.setData({
      searchStatus: true
    })
  },
  inputChange: function (e) {
    let value = e.detail.value
    this.setData({
      keyword: value
    })
  },
  inputFocus: function () {
    this.setData({
      searchStatus: false,
    });
  },
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    })
  },
  closeSearch: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },
  onKeywordTap: function (e) {
    let value = e.target.dataset.keyword
    this.setData({
      keyword: value,
      searchStatus: true
    })
  },
  getHelpKeyword: function () {

  },
  openSortFilter: function (e) {
    let id = e.currentTarget.id
    this.setData({
      currentSortType: id
    })
    let sort = this.data.currentSortOrder
    if (id === 'price') {
      if (sort === 'asc') {
        sort = 'desc'
      } else {
        sort = 'asc'
      }
    }
    this.setData({
      currentSortOrder: sort
    })
  }
})