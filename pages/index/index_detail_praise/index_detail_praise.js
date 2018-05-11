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
        url = 'praiseList?curPage=1&pageSize=100&neighborId=' + options.neighborId
    util.get(url)
        .then(res => {
          wx.hideLoading()
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
          })
          console.log(e)
        })


  },

})


