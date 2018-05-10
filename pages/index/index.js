//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    page: 1,
    pageSize: 20,
    hasMoreData: true,
    isHiddenToast: true,
    contentlist: [],
    bannerImgs: [
      'http://pub.huilaila.net/dfclub/index/index_02.jpg',
      'http://pub.huilaila.net/dfclub/index/index_01.jpg'
    ],
  },


  tapBanner: function (e) {
    let bannerId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'index_banner/index_banner?id=' + bannerId
    })
  },
  tapGroup: function (e) {
    let groupId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'index_group/index_group?id=' + groupId
    })
  },
  tapList: function (e) {
    let _this = this
    let listId = e.currentTarget.dataset.listid;
    wx.setStorageSync('indexList', this.data.contentlist[listId])
    wx.navigateTo({
      url: 'index_detail/index_detail'
    })
  },
  previewImg: function (e) {
    let _this = this,
        indexs = e.currentTarget.dataset.indexs,
        index = e.currentTarget.dataset.index
    wx.previewImage({
      current: _this.data.contentlist[indexs].annexs[index], // 当前显示图片的http链接
      urls: _this.data.contentlist[indexs].annexs // 需要预览的图片http链接列表
    })
  },

  isShowToast: function () {
    this.setData({
      isHiddenToast: false
    })
  },
  toastChange: function () {
    this.setData({
      isHiddenToast: true
    })
  },
  getList: function (message) {
    let that = this
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      });
    }
    wx.request({
      url: 'https://signin.afguanjia.com/club/newThings?page=' + that.data.page,
      success: function (res) {
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        wx.stopPullDownRefresh()
        let contentlistTem = that.data.contentlist
        if (res.data.code === 200) {
          if (that.data.page == 1) {
            contentlistTem = []
          }
          let contentlist = JSON.parse(res.data.data)
          console.dir(contentlist)
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: res.data.data.msg,
          })
        }
      },
      fail: function (res) {
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        wx.showToast({
          title: '加载数据失败',
        })
      }
    })
  },

  onLoad: function (options) {
    let _this = this
    _this.getList('正在加载数据...')
    util.get('/club/newThings')
        .then(res => {})
        .then(res=>{})
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1
    this.getList('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getList('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
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


