//logs.js
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
const config = require('../../config')
// 引入 QCloud 小程序增强 SDK
var uploadFile = require('../../utils/aliyun-vod-upload/uploadAliyun');
// 引入配置
var env = require('../../utils/aliyun-vod-upload/env.js');
var Base64 = require('../../utils/aliyun-vod-upload/Base64.js');

Page({
  data: {
    value: '',
    content: '',
    src: '',
    show: true,
    focus: true,
    video: '',
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
    this.setData({
      index: e.detail.value,
      value: this.data.defCommunityId
    })
  },
  publish: function () {
    let _this = this
    this.setData({
      focus: false
    })
    setTimeout(function () {

      if ((_this.data.value !== '') && (_this.data.content !== '')) {
        if (_this.data.src === '') {
          wx.showToast({
            icon: 'none',
            title: '请选择视频'
          })
        } else {
          util.post('http://192.168.200.207:3350/aliyun/video')
            .then(res => {
              if (res.status === 100){
                let data = res.data;
                console.log(data);
                const UploadAuthObj = JSON.parse(Base64.decode(data.uploadAuth));
                const UploadAddressObj = JSON.parse(Base64.decode(data.UploadAddress));
                _this.setData({
                  video: data.videoId
                });
                env.accessKeyId = UploadAuthObj.AccessKeyId;
                env.accessKeySecret = UploadAuthObj.AccessKeySecret;
                env.securityToken = UploadAuthObj.SecurityToken;
                env.aliyunFileKey = UploadAddressObj.FileName;
                uploadFile(_this.data.src, "", "",
                  function (res) {
                    console.log("上传成功")
                    let url = 'posts?topicType=15&topicContent=' + _this.data.content + '&communityId=' + _this.data.value + '&videoId=' + _this.data.video;
                    util.post(url)
                      .then(res => {
                        if (res.status === 100) {
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
                          console.log(res)
                          wx.showToast({
                            title: res.msg
                          })
                        }
                      })
                  })
                }
            })
            .catch(e=>{
              console.log(e);
              wx.showToast({
                title: "上传失败",
              })
            })
        }
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
