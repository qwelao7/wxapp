//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    url:''
  },
  onLoad: function () {
    // let _this = this,
    //     url = wx.getStorageSync('eventUrl');
    this.setData({
      // 'url': url
      'url':'https://signin.huilaila.net/index.html'
    })
  },
  tapImg:function () {
    wx.navigateTo({
      url: '../../index/index_banner/index_banner?id=2'
    })
  }
})
