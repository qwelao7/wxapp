//app.js
const util = require('./utils/util.js')
const qcloud = require('./utils/wafer2-client-sdk/index');
const config = require('./config')
const appVersion = "2.9.8"

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)


    qcloud.setLoginUrl(config.service.loginUrl);
    wx.getSetting({
      success: function (res) {
        // 判断是否已授权
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/authorize/authorize'
          })
        }
      }
    })

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    // const session = qcloud.Session.get()
    // qcloud.setLoginUrl(config.service.loginUrl);
    // if (session) {
    //   // 第二次登录
    //   // 或者本地已经有登录态
    //   // 可使用本函数更新登录态
    //   qcloud.loginWithCode({
    //     success: res => {
    //       this.setData({ userInfo: res, logged: true })
    //       util.showSuccess('登录成功')
    //     },
    //     fail: err => {
    //       console.error(err)
    //       util.showModel('登录错误', err.message)
    //     }
    //   })
    // } else {
    //   // 首次登录
    //   qcloud.login({
    //     success: res => {
    //       this.setData({ userInfo: res, logged: true })
    //       util.showSuccess('登录成功')
    //     },
    //     fail: err => {
    //       console.error(err)
    //       util.showModel('登录错误', err.message)
    //     }
    //   })
    // }
  },
  globalData: {
    userInfo: null,
    serverError: false,
    wxShow: true
  }
})