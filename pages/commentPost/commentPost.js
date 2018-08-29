// pages/commentPost/commentPost.js
import { $wuxRater } from '../../lib/wux/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [
      {
        id: '1',
        picUrl: 'http://img4.imgtn.bdimg.com/it/u=3381060308,3456742770&fm=27&gp=0.jpg',
        name: '双廊跟团一日游门票',
        spec: '2位成人',
        comment: '',
        commentPicList: [

        ],
        commented: false,
        imagePath: '/image/addp.png'
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let goodList = this.data.goodsList
    for (let i = 0; i < goodList.length; i++) {
      $wuxRater.init(goodList[i].id, {
        value: 5,
        fontSize: 21,
        margin: 6,
        text: ['非常差', '很差', '一般', '很好', '非常满意'],
        defaultTextColor: '#555',
        callback(value, data, text) {
          console.log(i, goodList[i].id, value)
        }
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
  bindInpuntValue: function (e) {
    let input = e.detail.value
    let index = e.currentTarget.dataset.index
    this.setData({
      [`goodsList[${index}].comment`]: input,
    })
  },
  chooseImage: function (e) {
    let index = e.currentTarget.dataset.index
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths
        that.setData({
          [`goodsList[${index}].imagePath`]: tempFilePaths,
          [`goodsList[${index}].commentPicList`]: [tempFilePaths]
        })
      }
    })
  },
  onPost: function (e) {
    let index = e.currentTarget.dataset.index
    if (this.data.goodsList[index].comment==''){
      wx.showToast({
        title: '请填写评价内容',
        icon:'none'
        // image: '/images/error.png',
      })
      // return
     
     
    }else{
       wx.showToast({
        title: '提交成功',
        icon: 'success',
      })
      this.setData({
        [`goodsList[${index}].commented`]: true
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  previewImage: function (e) {
    console.log(e)
    let goodsIndex = e.target.dataset.goodsIndex
    let picIndex = e.target.dataset.picIndex
    wx.previewImage({
      current: this.data.goodsList[goodsIndex].commentPicList[picIndex], // 当前显示图片的http链接
      urls: this.data.goodsList[goodsIndex].commentPicList // 需要预览的图片http链接列表
    })
  },
})