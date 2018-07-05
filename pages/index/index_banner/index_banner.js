//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgs: [
      ['http://pub.huilaila.net/dfclub/index/index_detail02.jpg'],
      ['http://pub.huilaila.net/dfclub/index/index_detail04.jpeg']
    ],
    showImg: ''
  },

  onLoad: function (options) {
    /**
     *加载页面后，显示loading，首张图片加载完成后隐藏loading
     */
    wx.showLoading({
      title: "加载中...",
    })
    let _this = this,
        img = _this.data.imgs[options.id];
    _this.setData({
      'showImg': img
    });
  },

  /**
   *图片加载完成后，隐藏loading
   */
  imgLoad: function (e) {
    wx.hideLoading()
  },

  onShareAppMessage: function (res, options) {
    return {
      title: '东方小镇Club',
      desc: '东方小镇Club',
      path: '/pages/index/index_banner/index_banner?id=' + options.id,
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


