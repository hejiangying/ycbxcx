const host = 'http://192.168.190.243:8080';
const api = {
  apiUser: {
    onLogin: host + '/apiUser/auth',
    get_union: host +'/apiUser/login',
    info: host + '/apiUser/info'
  },
  appGoods:{
    goodslist: host + '/apiGoods/list',
    goodsdetail: host +'/apiGoods/getGoodsById'
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
    mypost: host +'/apiArticle/myArticle'
  },
  img:{
    upload: host + '/upload/uploadImg'
  }
 
}
module.exports = api;