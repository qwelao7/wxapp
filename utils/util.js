const qcloud = require('./wafer2-client-sdk/index');
const config = require('../config')
const app = getApp()

//const baseURL = 'https://signin.afguanjia.com/club/' // 后台API地址
const baseURL = 'https://signin.afguanjia.com/weapptest/'
const uploadURL = 'http://192.168.1.55:7888/xcx/upload'


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 日期格式化为(年月)
 * time 时间戳
 */
const formatMonth = time => {
  let date;
  date = new Date(time * 1000);
  const year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();
  return year + '-' + month;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 阿拉伯数字转中文数字,
 * 如果传入数字时则最多处理到21位，超过21位js会自动将数字表示成科学计数法，导致精度丢失和处理出错
 * 传入数字字符串则没有限制
 * @param {number|string} digit
 */
const toZhDigit = (digit) => {
  digit = typeof digit === 'number' ? String(digit) : digit;
  const zh = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const unit = ['千', '百', '十', ''];
  const quot = ['万', '亿', '兆', '京', '垓', '秭', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祗', '那由他', '不可思议', '无量', '大数'];

  let breakLen = Math.ceil(digit.length / 4);
  let notBreakSegment = digit.length % 4 || 4;
  let segment;
  let zeroFlag = [], allZeroFlag = [];
  let result = '';

  while (breakLen > 0) {
    if (!result) { // 第一次执行
      segment = digit.slice(0, notBreakSegment);
      let segmentLen = segment.length;
      for (let i = 0; i < segmentLen; i++) {
        if (segment[i] != 0) {
          if (zeroFlag.length > 0) {
            result += '零' + zh[segment[i]] + unit[4 - segmentLen + i];
            // 判断是否需要加上 quot 单位
            if (i === segmentLen - 1 && breakLen > 1) {
              result += quot[breakLen - 2];
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[i]] + unit[4 - segmentLen + i];
            if (i === segmentLen - 1 && breakLen > 1) {
              result += quot[breakLen - 2];
            }
          }
        } else {
          // 处理为 0 的情形
          if (segmentLen == 1) {
            result += zh[segment[i]];
            break;
          }
          zeroFlag.push(segment[i]);
          continue;
        }
      }
    } else {
      segment = digit.slice(notBreakSegment, notBreakSegment + 4);
      notBreakSegment += 4;

      for (let j = 0; j < segment.length; j++) {
        if (segment[j] != 0) {
          if (zeroFlag.length > 0) {
            // 第一次执行zeroFlag长度不为0，说明上一个分区最后有0待处理
            if (j === 0) {
              result += quot[breakLen - 1] + zh[segment[j]] + unit[j];
            } else {
              result += '零' + zh[segment[j]] + unit[j];
            }
            zeroFlag.length = 0;
          } else {
            result += zh[segment[j]] + unit[j];
          }
          // 判断是否需要加上 quot 单位
          if (j === segment.length - 1 && breakLen > 1) {
            result += quot[breakLen - 2];
          }
        } else {
          // 第一次执行如果zeroFlag长度不为0, 且上一划分不全为0
          if (j === 0 && zeroFlag.length > 0 && allZeroFlag.length === 0) {
            result += quot[breakLen - 1];
            zeroFlag.length = 0;
            zeroFlag.push(segment[j]);
          } else if (allZeroFlag.length > 0) {
            // 执行到最后
            if (breakLen == 1) {
              result += '';
            } else {
              zeroFlag.length = 0;
            }
          } else {
            zeroFlag.push(segment[j]);
          }

          if (j === segment.length - 1 && zeroFlag.length === 4 && breakLen !== 1) {
            // 如果执行到末尾
            if (breakLen === 1) {
              allZeroFlag.length = 0;
              zeroFlag.length = 0;
              result += quot[breakLen - 1];
            } else {
              allZeroFlag.push(segment[j]);
            }
          }
          continue;
        }
      }


      --breakLen;
    }

    return result;
  }
}


const http = ({url = '', params = {}, header = {}, ...other} = {}) => {
  wx.showLoading({
    title: '正在加载数据...'
  })
  let time = Date.now()
  console.log(`开始:${time}`)
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: params,
      header: getHeader(header),
      ...other,
      complete: (res) => {
        wx.hideLoading()
        console.log(`耗时:${Date.now() - time}`)
        console.dir(res.data)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        }
        else {
          reject(res)
        }
      }
    })
  })
}

const getUrl = url => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}

const getHeader = header => {
  try {
    const session = qcloud.Session.get()
    const token = session.token
    let getHeader = header
    if (token) {
      getHeader.token = token
    }
    if (header.defCommunityId) {
      getHeader.defCommunityId = header.defCommunityId
    }
    return getHeader
  } catch (e) {
    return {}
  }
}
const isMobile = () => {
  try {
    const session = qcloud.Session.get()
    const token = session.token
    if (token) {
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

function doLogin () {
  const session = qcloud.Session.get()
  if (session) {
    // 第二次登录
    // 或者本地已经有登录态
    // 可使用本函数更新登录态
    qcloud.loginWithCode({
      success: res => {
        this.setData({userInfo: res, logged: true})
        showSuccess('登录成功')
      },
      fail: err => {
        console.error(err)
        showModel('登录错误', err.message)
      }
    })
  } else {
    // 首次登录
    qcloud.login({
      success: res => {
        this.setData({userInfo: res, logged: true})
        showSuccess('登录成功')
      },
      fail: err => {
        console.error(err)
        showModel('登录错误', err.message)
      }
    })
  }
}

// 显示繁忙提示
const showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success',
  success: function () {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 1000)
  }
})

// 显示失败提示
const showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
}

module.exports = {
  formatTime: formatTime,
  toZhDigit: toZhDigit,
  formatMonth: formatMonth,
  showBusy: showBusy,
  showSuccess: showSuccess,
  showModel: showModel,
  doLogin: doLogin,
  isMobile: isMobile,
  baseURL,
  uploadURL,
  get (url, params = {}, header = {},) {
    return http({
      url,
      params,
      header
    })
  },
  post (url, params = {}, header = {},) {
    return http({
      url,
      params,
      header,
      method: 'post'
    })
  },
  put (url, params = {}, header = {},) {
    return http({
      url,
      params,
      header,
      method: 'put'
    })
  },
  // 这里不能使用 delete, delete为关键字段
  myDelete (url, params = {}, header = {},) {
    return http({
      url,
      params,
      header,
      method: 'delete'
    })
  },
}
