const host = 'http://192.168.190.243:8080';
const api = {
  apiUser: {
    onLogin: host + '/apiUser/onLogin',
    get_union: host +'/apiUser/info',
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
  }
 
}
module.exports = api;