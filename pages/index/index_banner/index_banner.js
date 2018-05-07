//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgs: [
      'http://pub.huilaila.net/dfclub/index/index_detail01.jpg',
      'http://pub.huilaila.net/dfclub/index/index_detail02.jpg'
    ],
    showImg: ''
  },


  onLoad: function (options) {
    let _this = this,
        img = this.data.imgs[options.id];
    _this.setData({
      'showImg': img
    });
  },


  onShareAppMessage: function (res,options) {
    return {
      title: '东方小镇Club',
      desc: '东方小镇Club',
      path: '/pages/index/index_banner/index_banner?id='+options.id,
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


