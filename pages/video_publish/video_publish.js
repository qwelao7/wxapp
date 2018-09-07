//logs.js
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
const config = require('../../config')
// 引入 QCloud 小程序增强 SDK
// var uploadFile = require('../../utils/aliyun-vod-upload/uploadAliyun');
// 引入配置
// var env = require('../../utils/aliyun-vod-upload/env.js');
// var Base64 = require('../../utils/aliyun-vod-upload/Base64.js');

Page({
  data: {
    value: '',
    content: '',
    src: '',
    show: true,
    focus: true,
    video: '',
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
    this.setData({
      index: e.detail.value,
      value: this.data.defCommunityId
    })
  },
  publish: function () {
    let _this = this
    this.setData({
      focus: false
    }, () => {
      if ((_this.data.value !== '') && (_this.data.content !== '')) {
        if (_this.data.src === '') {
          wx.showToast({
            icon: 'none',
            title: '请选择视频'
          })
        } else {
          wx.showLoading({
            title: '视频上传中',
            mask: true
          })
          wx.uploadFile({
            url: config.uploadURL,
            filePath: _this.data.src,
            name: 'file',
            formData: {
              'type': 'video'
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: response => {
              wx.hideLoading()
              let res = JSON.parse(response.data)
              if (res.status === 100) {
                let url = 'posts?topicType=15&topicContent=' + _this.data.content + '&communityId=' + _this.data.value + '&videoUrl=' + res.data
                util.post(url)
                    .then(res => {
                      if (res.status === 100) {
                        wx.hideLoading();
                        wx.showToast({
                          icon: 'success',
                          title: '发布成功'
                        })
                        setTimeout(function () {
                          wx.navigateBack({
                            delta: 1
                          })
                        }, 1000)
                      } else {
                        wx.showToast({
                          icon:'none',
                          title: res.msg
                        })
                      }
                    })
              }
            }
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: '内容不能为空'
        })
      }


    })


  },
  onLoad: function () {
    this.setData({
      array: config.pickerInfo
    })
    const session = qcloud.Session.get()
    if (session) {
      this.setData({
        session: session
      })
    }
    console.log(this.data.session)
  },

  contentInput: function (e) {
    let that = this;
    that.setData({
      content: e.detail.value
    })
  },

  bindGetVideoButtonTap: function (e) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log(res);
        that.setData({
          src: res.tempFilePath,
          show: false
        });
      }
    })
  }

})
