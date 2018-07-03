//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    page: 1,
    pageSize: 20,
    hasMoreData: true,
    isHiddenToast: true,
    contentlist: [],
  },

  tapList: function (e) {
    let listId = e.currentTarget.dataset.listid;
    wx.setStorageSync('indexList', this.data.contentlist[listId])
    wx.navigateTo({
      url: '../index_detail/index_detail'
    })
  },

  tapLike: function (e) {
    let _this = this
    if (util.isMobile() === true) {
      let neighborId = e.currentTarget.dataset.neighborid
      let indexs = e.currentTarget.dataset.indexs
      let url = 'praises/' + neighborId
      let contentTemp = _this.data.contentlist
      if (contentTemp[indexs].isPraise === 0) {
        util.post(url)
            .then(res => {
              if (res.status === 100) {
                contentTemp[indexs].isPraise = 1
                contentTemp[indexs].topicPraiseNumber = parseInt(contentTemp[indexs].topicPraiseNumber) + 1
                _this.setData({
                  contentlist: contentTemp
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            })
      } else {
        util.myDelete(url)
            .then(res => {
              if (res.status === 100) {
                contentTemp[indexs].isPraise = 0
                contentTemp[indexs].topicPraiseNumber = parseInt(contentTemp[indexs].topicPraiseNumber) - 1
                _this.setData({
                  contentlist: contentTemp
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none'
                })
              }
            })
      }
    } else {
      wx.navigateTo({
        url: '/pages/mLogin/mLogin'
      })
    }
  },

  tapComment: function (e) {
    if (util.isMobile() === true) {
      let neighborId = e.currentTarget.dataset.neighborid
      wx.navigateTo({
        url: '/pages/index/index_comment/index_comment?neighborId=' + neighborId
      })
    } else {
      wx.navigateTo({
        url: '/pages/mLogin/mLogin'
      })
    }
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

  getList: function (message, groupId) {
    let that = this,
        url = 'club/newThings?curPage=' + that.data.page + '&communityId=' + groupId
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
          let contentlistTem = that.data.contentlist
          if (res.status === 100) {
            if (that.data.page == 1) {
              contentlistTem = []
            }
            let contentlist = res.data.resultList
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
            if (that.data.contentlist.length > 0) {
              wx.setNavigationBarTitle({title: that.data.contentlist[0].topicTag})
            }
          } else {
            wx.showToast({
              title: res.data.data.msg,
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
          console.log(e)
        })
  },

  onLoad: function () {
    let _this = this
    let groupId = wx.getStorageSync('groupId');
    _this.setData({
      groupId: groupId
    })
    _this.getList('正在加载数据...', groupId)
  },

  onShow: function () {
    this.onLoad()
  },
  onUnload: function () {
    wx.removeStorageSync('groupId')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let groupId = this.data.groupId
    this.data.page = 1
    this.getList('正在刷新数据', groupId)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let groupId = this.data.groupId
    if (this.data.hasMoreData) {
      this.getList('加载更多数据', groupId)
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


