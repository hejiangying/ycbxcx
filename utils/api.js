const host = 'http://192.168.190.243:8080';
const api = {
  apiUser: {
    onLogin: host + '/apiUser/onLogin',
    get_union: host +'/apiUser/info',
  },
  appGoods:{
    goodslist: host + '/appGoods/list',
    goodsdetail: host +'/appUser/getGoodsById'
  },
  appHotel:{
    houselist: host +'/appHotel/list',
    housedetail:host +'/appUser/getHotelById'
  }
 
}
module.exports = api;