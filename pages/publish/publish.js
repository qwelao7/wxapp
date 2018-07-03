//logs.js
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
const config = require('../../config')

Page({
  data: {
    imgList: [],
    defCommunityId: '',
    focus: true,
    array: [
      {
        communityId: 'd18ddf02-484a-11e8-9faf-48d539affdb4',
        name: '濮塘桃李春风'
      },
      {
        communityId: 'bcbb9597-3eba-11e8-9faf-48d539affdb4',
        name: '协鑫春风江南'
      },
      {
        communityId: '046ba2c8-328c-11e8-9faf-48d539affdb4',
        name: '南京桃花源'
      },
      {
        communityId: '585e764f-328c-11e8-9faf-48d539affdb4',
        name: '宝华桃李春风'
      },
      {
        communityId: '66dfa671-4392-11e8-9faf-48d539affdb4',
        name: '枣林桃里'
      }
    ],
  },
  blur: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  chooseImages: function () {
    let _this = this;
    let count = this.imgList.length;
    let leftCount = 9 - count;
    this.$wechat.chooseImage({
      count: leftCount, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        _this.imgList = _this.imgList.concat(res.tempFilePaths); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      }
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    this.data.defCommunityId = this.data.array[index].communityId;
    console.log('defCommunityId', this.data.defCommunityId)
    this.setData({
      index: e.detail.value
    })
  },
  publish: function () {
    let _this = this
    this.setData({
      focus: false
    })
    setTimeout(function () {

      if (_this.data.value) {
      } else {
        wx.showToast({
          icon: 'none',
          title: '评论内容不能为空'
        })
      }

    }, 100)
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'file',
      formData: {
        'user': 'test'
      },
      success: function (res) {
        var data = res.data
        //do something
      }
    })
  },
  onLoad: function () {

  },

})
