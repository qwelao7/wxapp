//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
var config = require('../../config');


Page({
  data: {
    mobileUrl: config.service.mobileUrl,
  },

  getPhoneNumber: function (e) {

    qcloud.request({
      // 要请求的地址
      url: this.data.mobileUrl,

      header: {"X-WX-Encrypted-Data": e.detail.encryptedData, 'X-WX-IV': e.detail.iv},

      // 请求之前是否登陆，如果该项指定为 true，会在请求之前进行登录
      login: false,

      success (result) {
        if (result.data.status == 100) {
          util.showSuccess('请求成功完成');
          qcloud.Session.set(result.data.data)
          console.log('request success', result)
        } else {
          util.showModel('登录失败', result.data.msg);
        }
      },

      fail (error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      },
      complete () {
        console.log('request complete');
      }
    });
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


