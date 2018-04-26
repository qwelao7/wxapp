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
  }
})
