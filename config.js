/**
 *此处主机域名修改成腾讯云解决方案分配的域名
 */
// 生产环境host
let host = 'signin.huilaila.net/club';

//测试环境host
// let host = 'signin.afguanjia.com';


let config = {

  // 下面的地址配合云端 Demo 工作
  service: {
    host,

    // 登录地址，用于建立会话
    loginUrl: `https://${host}/weapp/login`,

    // 测试的请求地址，用于测试会话
    requestUrl: `https://${host}/weapp/user`,

    // 测试的信道服务地址
    tunnelUrl: `https://${host}/tunnel`,

    //测试解密手机号
    mobileUrl: `https://${host}/weapp/mlogin`,
  },


  /**
   *提交审核版本号
   */
  appVersion: "3.0.1",


  /**
   * 生产环境地址
   */
  baseURL: 'https://signin.huilaila.net/club/',// 后台API地址
  uploadURL: 'https://app-img.huilaila.net:7889/xcx/upload',
  aliOSSServer: 'https://app-adminv10.huilaila.net:7660/',
  aliyunHome: 'http://oss.huilaila.net',
  commonConfig: {
    companyCode: 'df',
    appVersion: 'V1.4',
    passwordSalt: 'uama1209',
    phoneRegp: /^1(3|4|5|7|8|9)\d{9}$/,
    idCodeRegp: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    forButler: '!1ba2-@2a1-b3d4-1!2c42-c@-13d',
    productPayBusiness: 'product',
    scheme_IOS: 'SmartCommunityForNJDFEnterprise://WechatH5PayResult',
    aliOSSConfig: {
      region: 'oss-cn-hangzhou',
      bucket: 'huilaila-pub'
    },
    baseSize: 37.5
  },

  /**
   * 测试环境地址
   */
  // baseURL: 'https://signin.afguanjia.com/',
  // uploadURL: 'http://192.168.1.55:7888/xcx/upload',


  /**
   * picker的项目名和communityId列表
   */

// 生产环境
  pickerInfo: [
    {
      communityId: '9832d325-51d8-11e8-9faf-48d539affdb4',
      name: '濮塘·桃里'
    },
    {
      communityId: 'ee8f78d0-51d7-11e8-9faf-48d539affdb4',
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
      communityId: 'a4352cc4-51c9-11e8-9faf-48d539affdb4',
      name: '园博村·桃李春风'
    }
  ],

// 测试环境
//   pickerInfo: [
//     {
//       communityId: 'd18ddf02-484a-11e8-9faf-48d539affdb4',
//       name: '濮塘·桃里'
//     },
//     {
//       communityId: 'bcbb9597-3eba-11e8-9faf-48d539affdb4',
//       name: '协鑫春风江南'
//     },
//     {
//       communityId: '046ba2c8-328c-11e8-9faf-48d539affdb4',
//       name: '南京桃花源'
//     },
//     {
//       communityId: '585e764f-328c-11e8-9faf-48d539affdb4',
//       name: '宝华桃李春风'
//     },
//     {
//       communityId: '66dfa671-4392-11e8-9faf-48d539affdb4',
//       name: '园博村·桃李春风'
//     }
//   ],


};

module.exports = config;
