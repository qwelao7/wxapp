//logs.js
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
const config = require('../../config')

Page({
  data: {
    value: '',
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
          title: '内容不能为空'
        })
      }

    }, 100)

  },
  onLoad: function () {

  },

})
