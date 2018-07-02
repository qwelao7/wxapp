//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    url:''
  },
  onLoad: function () {
    // let _this = this,
    //     url = wx.getStorageSync('eventUrl');

    // 动态设置标题
    wx.setNavigationBarTitle({
      title: '活动预告'
    })

    this.setData({
      // 'url': url
      'url':'https://signin.huilaila.net/index.html'
    })
  },
  tapEvent:function () {
    wx.navigateTo({
      url: '../event_detail/event_detail'
    })
  }
})
