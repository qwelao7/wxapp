//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    towns: [
      {
        name: "濮塘·桃李",
        location: "句容国家森林公园旁",
        detail: "濮塘桃李，坐落于南京南、濮塘风景区内，意向开发用地2500亩，是绿城东方首个自主建设、运营的家庭旅游度假小镇。濮塘风景区有大小山峰49座，峡谷53条，水库8座，森林18000亩，竹林5000亩，茶园350亩，各种植物300余种。步入其中，只见层峦叠嶂、竹海茫茫，时有飞泉落于怪石之间。山风徐来，林海如鸣天籁。古银杏历经千载沧桑，仍虬枝铁干，年年新生，钟鼓地踏地而闻钟鼓声，神秘而又梦幻。与生俱来的野趣仙境，赋予濮塘桃李小镇更多奇异欢乐的可能。在小镇，忙碌的大人们真正放假了，孩子们忙着探索冒险，长者们田间撒欢，重回少年，一家人乐不归城。",
        imgUrls: [
          'http://pub.huilaila.net/dfclub/putang/1.jpg',
          'http://pub.huilaila.net/dfclub/putang/2.jpg',
          'http://pub.huilaila.net/dfclub/putang/3.jpg'
        ],
        url:'http://pub.huilaila.net/dfclub/putang/detail.jpg'
      },
      {
        name: "宝华桃李春风",
        location: "句容国家森林公园旁",
        detail: "宝华桃李春风位于宝华山国家森林公园东北侧，西临宝华山庄及千华古村，北接312国道，距沪宁高铁宝华山站3.5公里。项目总占地约3600亩，规划约2000余户，精装交付。目前已确定的一期规划面积约260亩，共计400余户。在建筑风格方面，宝华桃李春风属于小尺度中式合院，通过建筑、连廊与灰空间将庭院围合，为住户提供幽雅、私密的庭院生活。作为农旅文养综合小镇，宝华桃李春风将逐步完善生活类（小镇食堂、便利店、净菜市场、水果店、洗衣店、银行服务点等）、健康类（健康管理中心、健身会所、社区药房）、教育类（颐乐学院、自然教育）、休闲类（休闲农园、旅游商业、民宿、酒吧、咖啡吧、书吧）、文化类（各类文创产业设计师工作室、茶室）、社群类（小镇广场、小镇客厅、小镇礼堂）等各类服务配套。",
        imgUrls: [
          'http://pub.huilaila.net/dfclub/baohua/1.jpg',
          'http://pub.huilaila.net/dfclub/baohua/2.jpg',
          'http://pub.huilaila.net/dfclub/baohua/3.jpg',
          'http://pub.huilaila.net/dfclub/baohua/4.jpg',
          'http://pub.huilaila.net/dfclub/baohua/5.jpg',
          'http://pub.huilaila.net/dfclub/baohua/6.jpg',
          'http://pub.huilaila.net/dfclub/baohua/7.jpg'
        ],
        url:'http://pub.huilaila.net/dfclub/baohua/detail.jpg'
      },
      {
        name: "协鑫春风江南",
        location: "句容国家森林公园旁",
        detail: "协鑫春风江南，坐落于南京东、秦淮源、赤山湖风景区内，由协鑫集团携手蓝城东方团队共同打造。从城市出发，经长深高速至郭庄出口，向东片刻，即可抵达心中的田园。有宅，有院，有良田，春风江南正为都市人深情酿造田园生活之美。整个基地依一轴两心、一带两园来打造，将农地、林地、水系和建筑自然相融。这里有贯穿小镇东西方向的生态田园交通轴；这里将打造便捷小镇居民生活的小镇中心及田园次中心；这里原生地貌丰富，形成农、养、乐、景相互交融的生态田园观光带；这里独占地利，构筑水天一色的美丽田园及湿地公园。",
        imgUrls: [
          'http://pub.huilaila.net/dfclub/xiexin/1.jpg',
          'http://pub.huilaila.net/dfclub/xiexin/2.jpg',
          'http://pub.huilaila.net/dfclub/xiexin/3.jpg',
          'http://pub.huilaila.net/dfclub/xiexin/4.jpg',
          'http://pub.huilaila.net/dfclub/xiexin/5.jpg'
        ],
        url:'http://pub.huilaila.net/dfclub/xiexin/detail.jpg'
      },
      {
        name: "绿城·南京桃花源",
        location: "句容国家森林公园旁",
        detail: "绿城南京桃花源是绿城集团在南京汤山打造的顶级度假综合体。项目位于汤山国家级旅游度假区，距离新街口23公里，20分钟车程可直达中山门。项目占地540亩，规划有温泉度假酒店、林间餐厅、健康会所、中式合院等业态。项目由数千棵原生古树环抱，生态环境和人文底蕴优越。目前，顶级度假酒店品牌—安麓已入驻绿城南京桃花源，旨在打造成为中国第一家安麓温泉度假村。项目产品类型为320-600㎡中式合院别墅。别墅庭院和室内均精装交付。",
        imgUrls: [
          'http://pub.huilaila.net/dfclub/taohuayuan/1.jpg',
          'http://pub.huilaila.net/dfclub/taohuayuan/2.jpg',
          'http://pub.huilaila.net/dfclub/taohuayuan/3.jpg',
          'http://pub.huilaila.net/dfclub/taohuayuan/4.jpg',
          'http://pub.huilaila.net/dfclub/taohuayuan/5.jpg'
        ],
        url:'http://pub.huilaila.net/dfclub/taohuayuan/detail.jpg'
      },
      {
        name: "枣林·桃李",
        location: "句容国家森林公园旁",
        detail: "仪征枣林湾项目择址宁扬中心、华东最大的生态中心——扬州枣林湾生态园内，紧邻南京江北国家级新区，由蓝城东方团队与万博集团合作打造。2018年9月、2021年4月，江苏省园艺博览会、世界园艺博览会都将在此举办。作为省博园、世博园内的唯一私家园，仪征枣林湾项目是“两园”不可或缺的一部分，窗外就是4800亩的世界级山水园林大观，这在中国还是第一次。",
        imgUrls: [
          'http://pub.huilaila.net/dfclub/zaolin/detail.jpg'
        ],
        url:'http://pub.huilaila.net/dfclub/zaolin/detail.jpg'
      }
    ],
    town: {},
    town_id: ''

  },
  onLoad: function (options) {
    let town_id = options.id
    this.setData({
      'town': this.data.towns[town_id],
      'town_id': town_id
    })
  },
  onShareAppMessage: function (res) {
    let goTo = '/pages/towns/town_detail/town_detail?id=' + this.data.town_id
    return {
      title: '东方小镇Club',
      desc: '小镇详情',
      path: goTo,
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
