//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    praiselist: [],
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    });
    let _this = this,
        url = 'posts/' + options.neighborId + '/praises?curPage=1&pageSize=100'
    util.get(url)
        .then(res => {
          wx.hideLoading()
          console.log(url)
          if (res.status == 100) {
            _this.setData({
              praiselist: res.data.resultList
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
            title: '加载点赞列表失败',
            icon:'none'
          })
          console.log(e)
        })


  },

})


