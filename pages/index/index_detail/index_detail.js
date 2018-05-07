//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bannerImgs: [
      'http://pub.huilaila.net/dfclub/putang/1.jpg',
      'http://pub.huilaila.net/dfclub/putang/2.jpg',
      'http://pub.huilaila.net/dfclub/putang/3.jpg'
    ],
    grids: [0, 1, 2, 3, 4]
  },
  tapBanner: function (e) {

  },
  previewImg:function(e){

  },

  onLoad: function (options) {

  },


  onShareAppMessage: function (res) {
    return {
      title: '东方小镇Club',
      desc: '东方小镇Club首页',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showModal({
          content: '分享成功！',
          showCancel: false,
          success: function (res) {
          }
        });
      },
      fail: function (res) {
        // 转发失败
        wx.showModal({
          content: '分享失败！请重新尝试',
          showCancel: false,
          success: function (res) {
          }
        });
      }
    }
  }

})


