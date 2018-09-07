const host = 'http://192.168.190.243:8080';
const api = {
  apiUser: {
    onLogin: host + '/apiUser/auth',
    get_union: host +'/apiUser/login',
    info: host + '/apiUser/info'
  },
  appGoods:{
    goodslist: host + '/apiGoods/list',
    goodsdetail: host +'/apiGoods/getGoodsById',
    goodsClass: host +'/apiGoods/getGoodsType',
    goodsItem: host +'/apiGoods/list',
    another:host+'/apiGoodsItem/list',//通过商品接口
    anotherDetail: host +'/apiGoodsItem/getItemById',//通用商品详情
  },
  appHotel:{
    houselist: host +'/apiHotel/list',
    housedetail: host +'/apiHotel/getHotelById'
  },
  appLine:{
    linelist:host + '/apiLine/list',
    linedetail: host + '/apiLine/getLineById'
  },
  post:{
    postCreat: host + '/apiArticle/create',
    postList: host + '/apiArticle/list',
    postDel: host + '/apiArticle/delete',
    postDetail: host +'/apiArticle/getArticleById',
    mypost: host +'/apiArticle/myArticle',
    comment: host + '/apiArticle/review',
    replycomment: host +'/apiArticle/reply'
  },
  img:{
    upload: host + '/upload/uploadImg'
  },
  shop:{
    addShop: host + '/apiCart/create',
    shopList: host + '/apiCart/list',
    shopInfo: host + '/apiCart/info',
    delGoods: host +'/apiCart/delete'
  },
  address:{
    addressList: host +'/apiMember_address/list',
    addressDetail: host +'/apiMember_address/info',//地址详情
    addressDel: host +'/apiMember_address/delete',//删除地址
    addressAdd: host +'/apiMember_address/create',//添加地址
    addressUpdate: host + '/apiMember_address/update'
  }
 
}
module.exports = api;