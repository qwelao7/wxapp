//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    bannerImgs: [
      'http://pub.huilaila.net/dfclub/index/index_02.jpg',
      'http://pub.huilaila.net/dfclub/index/index_04.jpeg',
      'http://pub.huilaila.net/dfclub/index/index_03.jpg'
    ],
    activityLiveList: [],
    activityOldList: [],
    activityNewList: [],
    pageSize: 6,
    page: 1,
    categoryList: {
      '0': "活动预告",
      '1': "活动回顾"
    }
  },


  getActivityLiveList: function (message) {
    let that = this,
        url = 'activities/category/1?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize;
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      });
    }
    util.get(url)
        .then(res => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.stopPullDownRefresh()
          if (res.status === 100) {
            that.setData({
              activityLiveList: res.data
            })
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        })
        .catch(e => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.showToast({
            title: '加载数据失败',
          })
        })
  },
  getActivityOldList: function (message) {
    let that = this,
        url = 'activities/category/3?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize;
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      });
    }
    util.get(url)
        .then(res => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.stopPullDownRefresh()
          if (res.status === 100) {
            that.setData({
              activityOldList: res.data
            })
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        })
        .catch(e => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.showToast({
            title: '加载数据失败',
          })
        })
  },
  getActivityNewList: function (message) {
    let that = this,
        url = 'activities/category/2?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize;
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      });
    }
    util.get(url)
        .then(res => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.stopPullDownRefresh()
          if (res.status === 100) {
            that.setData({
              activityNewList: res.data
            })
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        })
        .catch(e => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.showToast({
            title: '加载数据失败',
          })
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
    _this.getActivityLiveList("加载数据失败");
    _this.getActivityOldList("加载数据失败");
    _this.getActivityNewList("加载数据失败");
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

  toActivityInfo: function (e) {
    wx.setStorageSync('activityId', e.currentTarget.dataset.id);
    wx.navigateTo({
      url: 'event_detail/event_detail'
    })
  },

  toCategoryList: function (e) {
    var id = '', name = '', that = this;
    id = e.currentTarget.dataset.id;
    wx.setStorageSync("categoryId", id);
    name = that.data.categoryList[id];
    wx.setStorageSync("categoryName", name);
    wx.navigateTo({
      url: 'event_category/event_category'
    })
  }
})
