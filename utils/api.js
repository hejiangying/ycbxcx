const host = 'http://192.168.190.243:8080';
const api = {
  home:{
    home: host +'/apiUser/home',//首页
    banner: host +'/apiAd/list',//轮播
    bannerdetail: host +'/apiAd/info',//轮播详情
  },
  apiUser: {
    onLogin: host + '/apiUser/auth',//授权
    get_union: host +'/apiUser/login',//登录
    info: host + '/apiUser/info'//获取用户信息
  },
  appGoods:{
    goodslist: host + '/apiGoods/list',//特产商品列表
    goodsdetail: host +'/apiGoods/getGoodsById',//特产商品详情
    goodsClass: host +'/apiGoods/getGoodsType',//特产分类
    goodsItem: host + '/apiGoods/list',//通用商品列表
    another:host+'/apiGoodsItem/list',//通过商品接口
    anotherDetail: host +'/apiGoodsItem/getItemById',//通用商品详情
  },
  appHotel:{
    houselist: host +'/apiHotel/list',//客栈列表
    housedetail: host +'/apiHotel/getHotelById',//客栈详情
    order: host +'/apiOrders_hotel/create',//酒店预订
    houseDetail: host +'/apiHotel/getRoomById'//房间详情
  },
  appLine:{
    linelist:host + '/apiLine/list',//线路列表
    linedetail: host + '/apiLine/getLineById'//线路详情
  },
  post:{
    postCreat: host + '/apiArticle/create',//创建帖子
    postList: host + '/apiArticle/list',//帖子列表
    postDel: host + '/apiArticle/delete',//删除帖子
    postDetail: host +'/apiArticle/getArticleById',//帖子详情
    mypost: host +'/apiArticle/myArticle',//我的帖子列表
    comment: host + '/apiArticle/review',//评论帖子
    replycomment: host +'/apiArticle/reply',//回复评论
    remove: host +'/apiArticle/remove',//删除评论
    noread: host +'/apiArticle/unread'//未读消息
  },
  img:{
    upload: host + '/upload/uploadImg'//上传图片
  },
  shop:{
    addShop: host + '/apiCart/create',//加入购物车
    shopList: host + '/apiCart/list',//购物车列表
    shopInfo: host + '/apiCart/info',//购物车商品详情
    delGoods: host +'/apiCart/delete'//删除商品
  },
  address:{
    addressList: host +'/apiMember_address/list',//地址列表
    addressDetail: host +'/apiMember_address/info',//地址详情
    addressDel: host +'/apiMember_address/delete',//删除地址
    addressAdd: host +'/apiMember_address/create',//添加地址
    addressUpdate: host + '/apiMember_address/update'//修改地址
  },
  order:{
    orderList: host +'/apiOrders/list',//客栈列表
    orderdetail: host +'/apiOrders/info',//客栈详情
    orderline: host +'/apiOrders_line/create',//自助游路线
    orderGoods: host +'/apiOrders_item/create',//通用商品预订
    ordercancle:host + '/apiOrders/cancel',//取消订单
    ordercomm: host +'/apiOrders/evaluate',//评价订单
    orderDel: host +'/apiOrders/delete',//删除订单
  },
  pay:{
    payall: host +'/apiCart/account',//结算所有
  },
  collection:{
    save: host +'/apiCollection/create',//收藏商品
    remove: host +'/apiCollection/remove',//取消收藏
    mycollection: host +'/apiCollection/list',//我的收藏
  },
  attention:{
    addatten:host+'/apiUser/follow',//关注
    removeatten: host +'/apiUser/remove',//取消关注
    myattention: host +'/apiUser/myFollow',//我的关注和我的粉丝
    black:host+'/apiUser/addBlack',//拉黑粉丝
  },
  buy:{
    buy: host +'/apiOrders/payment',//支付
    confirm: host +'/apiOrders/confirm',//确认收货
    refund: host +'/apiOrders/refund',//退款
    buyok: host +'/wxPay/payNotifyUr',//支付成功
  },
  like:{
    like: host +'/apiThumbs/create',//点赞
    removelike: host +'/apiThumbs/remove',//取消点赞
  },
  comment:{
    commlist: host +'/apiComment/list',//评论列表
  },
  play:{
    playList: host +'/apiSupplier/list',//附近玩列表
    info:host + '/apiSupplier/info',//附近玩详情
  }
 
}
module.exports = api;