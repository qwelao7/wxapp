//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    url: 'town_detail/town_detail',
    towns: [
      {
        name: '濮塘·桃李',
        imgUrl: 'http://pub.huilaila.net/dfclub/towns/putang.png',
        subTitle: '南京南 濮塘风景区 农旅度假小镇'
      },
      {
        name: '宝华桃李春风',
        imgUrl: 'http://pub.huilaila.net/dfclub/towns/baohua.png',
        subTitle: '南京东 宝华山景区 故乡小镇'
      },
      {
        name: '协鑫春风江南',
        imgUrl: 'http://pub.huilaila.net/dfclub/towns/xiexin.png',
        subTitle: '南京东 秦淮源 农耕科技小镇',
      },
      {
        name: '绿城·南京桃花源',
        imgUrl: 'http://pub.huilaila.net/dfclub/towns/taohuayuan.png',
        subTitle: '汤山国家级旅游度假区内 东方生活综合体'
      },
      {
        name: '枣林·桃李',
        imgUrl: 'http://pub.huilaila.net/dfclub/towns/zaolin.png',
        subTitle: '宁扬中心 双博园内 园博小镇'
      },
    ]
  },
  tapTown: function (e) {
    let goTo = this.data.url + '?id=' + e.currentTarget.id;
    wx.navigateTo({
      url: goTo
    })
  },
  onLoad: function () {

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
  }

})
