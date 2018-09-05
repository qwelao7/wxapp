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
      '2': "活动预告",
      '3': "活动回顾"
    },
    liveDisable: false,
    oldDisable: false,
    newDisable: false,
  },


  getActivityList: function (message) {
    let that = this,
        url_1 = 'activities/category/1?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize,
        url_2 = 'activities/category/2?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize,
        url_3 = 'activities/category/3?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize;
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      });
    }
    util.get(url_1)
        .then(res => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.stopPullDownRefresh()
          if (res.status === 100) {
            if (res.data) {
              that.setData({
                activityLiveList: res.data
              });
              if (res.data.length > 0) {
                that.setData({
                  liveDisable: true
                });
              } else {
                that.setData({
                  liveDisable: false
                });
              }
            }

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
        });

    util.get(url_2)
        .then(res => {
          wx.stopPullDownRefresh()
          if (res.status === 100) {
            if (res.data) {
              console.log(res)
              that.setData({
                activityNewList: res.data
              });
              if (res.data.length > 0) {
                that.setData({
                  newDisable: true
                });
              } else {
                that.setData({
                  newDisable: false
                });
              }
            }
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        })
        .catch(e => {
          wx.showToast({
            title: '加载数据失败',
          })
        });

    util.get(url_3)
        .then(res => {
          wx.stopPullDownRefresh()
          if (res.status === 100) {
            console.log('history', res.data)
            that.setData({
              activityOldList: res.data
            });
            if (res.data.length > 0) {
              that.setData({
                oldDisable: true
              });
            } else {
              that.setData({
                oldDisable: false
              });
            }
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        })
        .catch(e => {
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
    _this.getActivityList("加载数据中");
  },
  onShow: function () {
    this.onLoad()
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
    wx.navigateTo({
      url: 'event_detail/event_detail?activityId=' + e.currentTarget.dataset.id
    })
  },

  toCategoryList: function (e) {
    var id = '', name = '', that = this;
    id = e.currentTarget.dataset.id;
    name = that.data.categoryList[id];
    wx.navigateTo({
      url: 'event_category/event_category?categoryId=' + id + '&categoryName=' + name
    })
  }
})
