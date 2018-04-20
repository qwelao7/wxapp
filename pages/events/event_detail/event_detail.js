//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
  },
  onLoad: function () {
    let _this = this,
    url=wx.getStorageSync('eventUrl');
    _this.setData({
      'url':url
    })
  }
})
