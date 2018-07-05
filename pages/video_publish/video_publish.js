//logs.js
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
const config = require('../../config')

Page({
  data: {
    value: '',
    focus: true,
    array: [],
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
    this.setData({
      array: util.pickerInfo
    })
  },

})
