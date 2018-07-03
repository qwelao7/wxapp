//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    url:'',
    id: '',
    page: 1,
    pageSize: 10,
    contentlist: [],
    hasMoreData: false
  },

  getList: function (message) {
    let that = this,
        url = 'activities/category/'+that.data.id+'?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize;
    wx.showNavigationBarLoading();
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
            let contentlist = res.data;
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
    let _this = this,
        id = wx.getStorageSync('categoryId');

    // 动态设置标题
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('categoryName')
    });
    this.setData({
      'id': id,
      'url':'http://pub.huilaila.net/dfclub/index/index_02.jpg'
    });
    _this.getList("正在加载数据...");
  },

  onUnload: function(){
    wx.removeStorageSync('categoryId');
    wx.removeStorageSync('categoryName');
  },

  tapEvent:function (e) {
    wx.setStorageSync('activityId',e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../event_detail/event_detail'
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this;
    that.data.page = 1
    that.getList('正在刷新数据')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    if (that.data.hasMoreData) {
      that.getList('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },
})
