//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    bannerImgs: [
      'http://pub.huilaila.net/dfclub/index/index_02.jpg',
      'http://pub.huilaila.net/dfclub/index/index_04.jpeg',
      'http://pub.huilaila.net/dfclub/index/index_03.jpg'
    ]
  },
  tapImg: function () {
    wx.navigateTo({
      url: 'event_detail/event_detail'
    })
  },
  onLoad: function () {
    let _this = this;
    // wx.request({
    //   url: 'https://signin.huilaila.net/sign/club/event_data',
    //   success: function (res) {
    //     let resData = res.data.club_event_data;
    //     for (let month of resData) {
    //       let nowTime = util.formatMonth(Date.parse(new Date()) / 1000)
    //       if (month.month === nowTime) {
    //         month.isShow = true;
    //       } else {
    //         month.isShow = false;
    //       }
    //       for (let week of month.week_data) {
    //         week.weekCN = '第' + util.toZhDigit(parseInt(week.week)) + '周';
    //       }
    //     }
    //     _this.setData({
    //       'events': resData
    //     });
    //     console.log(_this.data.events)
    //   }
    // })
  },
  tapMore: () => {
    wx.navigateTo({
      url: 'event_category/event_category'
    })
  },

  onShareAppMessage: function (res) {
    return {
      title: '东方小镇Club',
      desc: '活动详情',
      path: '/pages/events/events',
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
  },
  tapImg: function () {
    wx.navigateTo({
      url: 'event_detail/event_detail'
    })
  }
})
