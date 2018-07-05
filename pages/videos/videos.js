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
    images: [],
    col1: [],
    col2: []
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

        this.loadImages();
        console.log(this.data.images)
      }
    })
    this.setData({
      wxShow: app.globalData.wxShow
    })

  },

  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;

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

  loadImages: function () {
    let images = [
      {pic: "http://pub.huilaila.net/dfclub/baohua/1.jpg", height: 0},
      {pic: "http://pub.huilaila.net/dfclub/baohua/2.jpg", height: 0},
      {pic: "http://pub.huilaila.net/dfclub/fake/fake-08.jpg", height: 0},
      {pic: "http://pub.huilaila.net/dfclub/baohua/4.jpg", height: 0},
      {pic: "http://pub.huilaila.net/dfclub/baohua/5.jpg", height: 0},
      {pic: "http://pub.huilaila.net/dfclub/baohua/6.jpg", height: 0},
      {pic: "http://pub.huilaila.net/dfclub/baohua/7.jpg", height: 0},
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({
      loadingCount: images.length,
      images: images
    });
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

})
