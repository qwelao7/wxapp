//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    events: [],
    class:[
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/01_2.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/02_1.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/03_1.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/04_1.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/05_1.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/06_1.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/07_1.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/08_1.png'
      },
      {
        url:'',
        img:'http://pub.huilaila.net/dfclub/syllabus/09_1.png'
      },
    ]
  },
  tapMonth: function (e) {
    let tapIndex = e.currentTarget.dataset.month
    let temp = this.data.events;
    if (temp[tapIndex].isShow === true) {
      temp[tapIndex].isShow = false
    } else {
      for (let value of temp) {
        if (value.isShow === true) {
          value.isShow = false
        }
      }
      temp[tapIndex].isShow = true
    }
    this.setData({
      'events': temp
    })
  },
  tapEvent: function (e) {
    let monthIndex = e.currentTarget.dataset.month,
        weekIndex = e.currentTarget.dataset.week,
        eventIndex = e.currentTarget.dataset.event
    if (this.data.events[monthIndex].week_data[weekIndex].data[eventIndex].eventUrl) {
      wx.setStorageSync('eventUrl', this.data.events[monthIndex].week_data[weekIndex].data[eventIndex].eventUrl);
      wx.navigateTo({
        url: 'event_detail/event_detail'
      })
    }

  },
  tapImg: function () {
    wx.navigateTo({
      url: 'event_detail/event_detail'
    })
  },
  tapQR: function () {
    wx.previewImage({
      current: 'http://pub.huilaila.net/dfclub/syllabus/qrcode01.jpg', // 当前显示图片的http链接
      urls: ['http://pub.huilaila.net/dfclub/syllabus/qrcode01.jpg'] // 需要预览的图片http链接列表
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
  }
})
