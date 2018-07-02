//index.js
//获取应用实例
const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    commentPage: 1,
    likePage: 1,
    commentPageSize: 20,
    likePageSize: 20,
    hasMoreData: true,
    isHiddenToast: true,
    commentlist: [],
    likelist: [],
    isPraise: 0
  },

  previewImg: function (e) {
    let _this = this,
        index = e.currentTarget.dataset.index
    wx.previewImage({
      current: _this.data.content.annexs[index], // 当前显示图片的http链接
      urls: _this.data.content.annexs // 需要预览的图片http链接列表
    })
  },

  tapPraiseList: function () {
    if (this.data.content.topicPraiseNumber) {
      wx.navigateTo({
        url: '../index_detail_praise/index_detail_praise?neighborId=' + this.data.content.neighborId
      })
    }
  },

  tapLike: function () {
    let _this = this
    if (util.isMobile() === true) {
      let postId = _this.data.content.neighborId
      let url = 'praises/' + postId
      let contentTemp = _this.data.content
      if (contentTemp.isPraise === 0) {
        util.post(url)
            .then(res => {
              if (res.status === 100) {
                contentTemp.isPraise = 1
                contentTemp.topicPraiseNumber = parseInt(contentTemp.topicPraiseNumber) + 1
                _this.setData({
                  content: contentTemp
                })
              } else {
                wx.showToast({
                  title: res.msg
                })
              }
            })
      } else {
        util.myDelete(url)
            .then(res => {
              if (res.status === 100) {
                contentTemp.isPraise = 0
                contentTemp.topicPraiseNumber = parseInt(contentTemp.topicPraiseNumber) - 1
                _this.setData({
                  content: contentTemp
                })
              } else {
                wx.showToast({
                  title: res.msg
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

  tapComment: function () {
    if (util.isMobile() === true) {
      let neighborId = this.data.content.neighborId
      wx.navigateTo({
        url: '/pages/index/index_comment/index_comment?neighborId=' + neighborId
      })
    } else {
      wx.navigateTo({
        url: '/pages/mLogin/mLogin'
      })
    }
  },


  onLoad: function (options) {
    let _this = this,
        content = wx.getStorageSync('indexList'),
        body = content.body,
        praiseUrl = 'praiseList?curPage=1&pageSize=10&neighborId=' + content.neighborId
    body = body.replace(/<style(([\s\S])*?)<\/style>/g, '')
    content.body = body
    _this.setData({
      content: content,
      // 是否显示功能
      wxShow: app.globalData.wxShow
    })
    console.log('content', content)
    util.get(praiseUrl)
        .then(res => {
          if (res.status == 100) {
            _this.setData({
              likelist: res.data.resultList
            })
          } else {
            wx.showToast({
              title: res.msg,
            })
          }
        })
        .catch(e => {
          wx.showToast({
            title: '加载点赞数据失败',
          })
          console.log(e)
        })
    _this.getCommentList('正在加载数据...')
    console.log('data', _this.data)
  },

  onShow: function () {
    this.onLoad()
  },

  onUnload: function () {
    wx.removeStorageSync('indexList')
  },

  getCommentList: function (message) {
    let that = this
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      });
    }
    let commentUrl = 'commentList?curPage=' + that.data.commentPage + '&pageSize=' + that.data.commentPageSize + '&neighborId=' + that.data.content.neighborId
    util.get(commentUrl)
        .then(res => {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          wx.stopPullDownRefresh()
          let commentlistTem = that.data.commentlist
          if (res.status == 100) {
            if (that.data.commentPage == 1) {
              commentlistTem = []
            }
            let commentlist = res.data.resultList
            if (commentlist == '' || commentlist == null || commentlist == undefined) {
              that.setData({
                commentlist: commentlistTem,
                hasMoreData: false
              })
            } else {
              if (commentlist.length < that.data.commentPageSize) {
                that.setData({
                  commentlist: commentlistTem.concat(commentlist),
                  hasMoreData: false
                })
              } else {
                that.setData({
                  commentlist: commentlistTem.concat(commentlist),
                  hasMoreData: true,
                  page: that.data.page + 1
                })
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
            title: '加载评论数据失败',
          })
          console.log(e)
        })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.commentPage = 1
    this.getCommentList('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getCommentList('加载更多数据')
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


