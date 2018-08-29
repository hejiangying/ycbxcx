// 项目工具集，只跟该项目有关
const toolkit = require('ToolKit.js');
const api = require('api.js');
const protools = {
  // 对新闻进行点赞
  praiseNews: function (id, callback) {
    var params = {
      id: id,
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.news.praise, params, callback);
  },
  // 取消对新闻点赞
  cancelPraiseNews: function (id, callback) {
    var params = {
      id: id,
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.news.cancle_praise, params, callback);
  },
  // 关注达人
  attentionTalent: function (id, callback) {
    var params = {
      id: id,
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.news.attention_news, params, callback);
  },
  // 取消关注达人
  cancelAttentionTalent: function (id, callback) {
    var params = {
      id: id,
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.news.cancle_attention, params, callback);
  },
  // 对帖子进行点赞
  praisePost: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.community.praise_cancelpraise_post + '/' + id + '/like', params, callback)
  },
  // 对帖子取消点赞
  cancelPostPraise: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.community.praise_cancelpraise_post + '/' + id + '/cancel-like', params, callback)
  },
  // 删除帖子
  deletePost: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token'),
      _method: 'delete'
    }
    toolkit.post(api.community.delete_post + '/' + id, params, callback)
  },
  // 对帖子的评论进行点赞
  praisePostComment: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.community.praiseReply + '/' + id + '/like', params, callback)
  },
  // 对帖子的评论取消点赞
  cancelPraisePostComment: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.community.praiseReply + '/' + id + '/cancel-like', params, callback)
  },
  //删除问答
  deleteQA: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token'),
      _method: 'delete'
    }
    toolkit.post(api.community.delete_QA + '/' + id, params, callback)
  },
  //对问答进行点赞
  praiseQA: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.community.praise_cancelpraise_QA + '/' + id + '/like', params, callback)
  },
  //对问答取消点赞
  cancelPraiseQA: function (id, callback) {
    var params = {
      token: wx.getStorageSync('token')
    }
    toolkit.post(api.community.praise_cancelpraise_QA + '/' + id + '/cancel-like', params, callback)
  },
  // 续费
  renewalFee: function (communityId, price, callback) {
    toolkit.get(api.user.recharge,
      {
        token: wx.getStorageSync('token'),
        total: price * 100,
        group_id: communityId,
        renew: 1
      },
      function (res) {
        console.log('支付', res)
        var orderId = res.data.out_trade_no;
        wx.requestPayment({
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
          success: function (res) {
            console.log('支付成功', res)
            wx.showModal({
              title: '温馨提示',
              content: '哟哟辣妈收款会有延迟,若已支付,请等待1-2分钟后刷新查看结果,若尚未支付,请稍后重新支付',
              showCancel: false,
              confirmText: '好的,我知道了'
            })
            toolkit.get(api.user.recharge_submit,
              {
                token: wx.getStorageSync('token'),
                out_trade_no: orderId
              }, function (res) {
                if (res.data.code == 200) {
                  toolkit.post(api.community.group + '/' + communityId + '/renew',
                    {
                      token: wx.getStorageSync('token'),
                    }, callback)
                }
              })
          },
          complete: function (res) {
            console.log('支付完成', res)
          },
          fail: function () {
            wx.showModal({
              title: '温馨提示',
              content: '哟哟辣妈收款会有延迟,若已支付,请等待1-2分钟后刷新查看结果,若尚未支付,请稍后重新支付',
              showCancel: false,
              confirmText: '好的,我知道了'
            })
          }
        })
      }
    )
  },
  //删除评论
  deleteComment: function (id, callback) {
    var url = api.comment.comment,
      params = {
        id: id,
        _method: 'delete',
        token: wx.getStorageSync('token')
      };
    toolkit.post(url, params, callback);
  },
  // 验证用户是否关注小程序，加入社群等
  getVerify: function (group_id, callback, failback) {
    toolkit.post(api.community.verification,
      {
        group_id: group_id,
        token: wx.getStorageSync('token'),
        openid: wx.getStorageSync('openid'),
      }, callback, failback)
  },
  // 判断社群的状态
  getGroupStatus: function (id, callback, failback) {
    var url = api.community.getGroupStutus, params = {
      group_id: id,
      token: wx.getStorageSync('token')
    }
    toolkit.get(url, params, function (res) {
      console.log('判断社群状态', res)
      if (20035 == res.data.code) {
        callback();
      } else if (20033 == res.data.code) {
        wx.showModal({
          title: '提示',
          content: '社群已解散',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../community/community',
              })
            }
          }
        })
      } else if (20034 == res.data.code) {
        wx.showModal({
          title: '提示',
          content: '社群已冻结',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../community/community',
              })
            }
          }
        })
      }
    }, failback)
  }
}
module.exports = protools;