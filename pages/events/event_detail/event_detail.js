//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    url: '',
    id: '',
    activityInfo: {}
  },
  onLoad: function () {
    let _this = this,
        id = wx.getStorageSync('activityId');

    _this.setData({
      'id': id,
      'url': 'https://signin.huilaila.net/index.html'
    });
    _this.getActivityInfo("正在加载数据");
  },
  onUnload: function () {
    wx.removeStorageSync('activityId');
  },
  // tapImg:function () {
  //   wx.navigateTo({
  //     url: '../../index/index_banner/index_banner?id=2'
  //   })
  // }

  getActivityInfo: function (message) {
    let that = this,
        url = 'activities/' + that.data.id;
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      });
    }
    util.get(url)
        .then(res => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.stopPullDownRefresh()
          if (res.status === 100) {
            that.setData({
              activityInfo: res.data
            })
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        })
        .catch(e => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.showToast({
            title: '加载数据失败',
          })
        })
  }
})
