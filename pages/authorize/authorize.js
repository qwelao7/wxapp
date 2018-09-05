//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');


Page({
  data: {},

  bindGetUserInfo: function () {
    const session = qcloud.Session.get()
    wx.showLoading({
      title: '登录中..',
      mask: true
    })
    if (session) {
      // 第二次登录
      // 或者本地已经有登录态
      // 可使用本函数更新登录态
      qcloud.loginWithCode({
        success: res => {
          wx.hideLoading()
          this.setData({userInfo: res, logged: true})
          util.showSuccess('登录成功')
        },
        fail: err => {
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    } else {
      // 首次登录
      qcloud.login({
        success: res => {
          wx.hideLoading()
          this.setData({userInfo: res, logged: true})
          util.showSuccess('登录成功')
        },
        fail: err => {
          wx.hideLoading()
          console.error(err)
          util.showModel('登录错误', err.message)
        }
      })
    }
  },
  onLoad: function (options) {
    let _this = this
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


