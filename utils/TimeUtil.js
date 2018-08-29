const timeutil = {
  // 将时间戳转换为时间节点，1分钟前，1小时前...
  timeStamp2TimeFrame: function (timeStamp) {
    var minute = 1000 * 60;  //分钟
    var hour = minute * 60; //小时
    var day = hour * 24;  //天
    var month = day * 30;  //月
    var now = new Date().getTime();  //当期时间
    if (timeStamp.length !== 13) {
      timeStamp *= 1000;
    }
    var timeInterval = now - parseInt(timeStamp);  //时间间隔
    var result = '';
    if (timeInterval >= 0) {
      var monthC = timeInterval / month;
      var weekC = timeInterval / (7 * day);
      var dayC = timeInterval / day;
      var hourC = timeInterval / hour;
      var minC = timeInterval / minute;
      if (dayC >= 1 && dayC <= 2) {
        result = "昨天";
      } else if (dayC < 1 && hourC >= 1) {
        result = parseInt(hourC) + "小时前";
      } else if (hourC < 1 && minC >= 1) {
        result = parseInt(minC) + "分钟前";
      } else if (minC < 1) {
        result = "刚刚";
      } else if (monthC >= 12) {
        var s = new Date(timeStamp);
        result = s.getFullYear() + '年' + (s.getMonth() + 1) + '月' + s.getDate() + '日';
      } else {
        var s = new Date(timeStamp);
        result = (s.getMonth() + 1) + '月' + s.getDate() + '日';
      }
    } else {
      result = ''
    }
    return result;
  },
  timeStamp2Standard: function (timeStamp) {
    if (timeStamp.length !== 13) {
      timeStamp *= 1000;
    }
    var date = new Date(timeStamp);
    return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  },
  timeStamp2Standard2: function (timeStamp) {
    if (timeStamp.length !== 13) {
      timeStamp *= 1000;
    }
    var date = new Date(timeStamp);
    return date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + date.getDate();
  },
  formatTime: function (time) {
    if (typeof time !== 'number' || time < 0) {
      return time;
    }
    var minute = parseInt(time / 60),
      time = time % 60,
      second = time;
    return ([minute, second]).map(function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }).join(':')
  }
};
module.exports = timeutil;