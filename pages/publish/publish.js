//logs.js
const util = require('../../utils/util.js')
const qcloud = require('../../utils/wafer2-client-sdk/index');
const config = require('../../config')

Page({
  data: {
    imgList: [],
    uploadList: [],
    defCommunityId: '',
    value: '',
    focus: true,
    array: [],
  },
  blur: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  chooseImages: function () {
    let _this = this;
    let count;
    if (_this.imgList !== '' && _this.imgList !== null && _this.imgList !== undefined) {
      count = _this.imgList.length
    } else {
      count = 0
    }
    let leftCount = 9 - count;
    wx.chooseImage({
      count: leftCount, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let temp = _this.data.imgList
        temp = temp.concat(res.tempFilePaths)
        _this.setData({
          imgList: temp
        })
      }
    });
  },
  deleteImage: function (e) {
    let index = e.currentTarget.dataset.index
    let temp = this.data.imgList
    temp.splice(index, 1)
    this.setData({
      imgList: temp
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let index = e.detail.value;
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
    }, () => {

      if (_this.data.value) {
        if (_this.data.imgList.length) {
          // 如果有图片
          wx.showLoading({
            title: '上传图片中...'
          })
          let uploadImgCount = 0;
          for (let i = 0, h = _this.data.imgList.length; i < h; i++) {
            wx.uploadFile({
              url: config.uploadURL,
              filePath: _this.data.imgList[i],
              name: 'file',
              formData: {
                'type': 'nei'
              },
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (response) {
                let res = JSON.parse(response.data)
                if (res.status === 100) {
                  uploadImgCount++;
                  let temp = _this.data.uploadList
                  temp.push(res.data)
                  _this.setData({
                    uploadList: temp
                  })
                  //如果是最后一张,则隐藏等待中，发起发布新鲜事请求
                  if (uploadImgCount === _this.data.imgList.length) {
                    console.log('uploadList', _this.data.uploadList)
                    let url = 'posts?topicType=6&topicContent=' + _this.data.value + '&communityId=' + _this.data.defCommunityId + '&imageUrls=' + JSON.stringify(_this.data.uploadList)
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
                              title: res.msg
                            })
                          }
                        })
                  }
                }
              },
              fail: function (res) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) {
                  }
                })
              }
            });
          }

        } else {
          // 没有图片
          wx.showToast({
            icon: 'loading',
            title: '发布中...'
          })
          let url = 'posts?topicType=6&topicContent=' + _this.data.value + '&communityId=' + _this.data.defCommunityId
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
                  wx.showToast({
                    title: res.msg
                  })
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

})
