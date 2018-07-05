//logs.js
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
const config = require('../../config')
const app = getApp()


let col1H = 0;
let col2H = 0;

Page({

  data: {
    wxShow: true,
    scrollH: 0,
    imgWidth: 0,
    // loadingCount: 0,
    col1: [],
    col2: [],
    page: 1,
    pageSize: 20,
    contentlist: [],
    hasMoreData: false,
  },

  getList: function (message) {
    let that = this,
        url = 'club/video?curPage=' + that.data.page + '&pageSize=' + that.data.pageSize;
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
            let contentlist = res.data.resultList;
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
            that.loadImages(contentlist);
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
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
        this.getList("正在加载数据...");
      }
    })
    this.setData({
      wxShow: app.globalData.wxShow
    })

  },

  tapPublish: function () {
    if (util.isMobile() === true) {
      wx.navigateTo({
        url: '/pages/video_publish/video_publish'
      })
    } else {
      wx.navigateTo({
        url: '/pages/mLogin/mLogin'
      })
    }
  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.contentlist;
    let imageObj = {};

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        imageObj.height = imgHeight;
        break;
      }
    }

    // let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    // let data = {
    //   loadingCount: loadingCount,
    //   col1: col1,
    //   col2: col2
    // };
    //
    // if (!loadingCount) {
    //   data.images = [];
    // }

    this.setData({
      // loadingCount: loadingCount,
      col1: col1,
      col2: col2
    });
  },

  loadImages: function (list) {
    let images = list;

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
      images[i].height = 0;
    }

    this.setData({
      loadingCount: images.length,
      contentlist: images
    });
    console.log(images)
  },
  onShareAppMessage: function (res) {
    return {
      title: '东方小镇Club',
      desc: '小镇列表',
      path: '/pages/towns/towns',
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   let that = this;
  //   that.data.page = 1
  //   that.getList('正在刷新数据')
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   let that = this;
  //   if (that.data.hasMoreData) {
  //     that.getList('加载更多数据')
  //   } else {
  //     wx.showToast({
  //       title: '没有更多数据',
  //     })
  //   }
  // },
})
