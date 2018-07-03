//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    neighborId: '',
    value: '',
    focus: true
  },

  onLoad: function (options) {
    let _this = this
    _this.setData({
      neighborId: options.neighborId
    });
    console.log(_this.data.neighborId)
  },
  blur: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  tapSubmit: function () {
    let _this = this
    this.setData({
      focus: false
    })

    setTimeout(function () {
      if (_this.data.value) {
        let url = 'comments?neighborId=' + _this.data.neighborId + '&message=' + _this.data.value
        util.post(url)
            .then(res => {
              console.log(res)
              if (res.status === 100) {
                wx.showToast({
                  icon: 'success',
                  title: '发布成功',
                  success: function () {
                    let indexList = wx.getStorageSync('indexList');
                    if (indexList) {
                      indexList.topicCommentNumber = parseInt(indexList.topicCommentNumber) + 1
                      wx.setStorageSync('indexList', indexList);
                    }
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1
                      })
                    }, 1000)

                  }
                })
              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.msg
                })
              }
            })
      } else {
        wx.showToast({
          icon: 'none',
          title: '评论内容不能为空'
        })
      }

    }, 100)
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


