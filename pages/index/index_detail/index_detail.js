//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  tapBanner: function (e) {

  },
  previewImg: function (e) {
    let _this = this,
        index = e.currentTarget.dataset.index
    wx.previewImage({
      current: _this.data.content.annexs[index], // 当前显示图片的http链接
      urls: _this.data.content.annexs // 需要预览的图片http链接列表
    })
  },

  onLoad: function (options) {
    let content=wx.getStorageSync('indexList');
    this.setData({
      content: content
    })
    console.log(this.data.content)
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


