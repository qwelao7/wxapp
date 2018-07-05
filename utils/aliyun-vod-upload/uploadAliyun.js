const env = require('./env.js');

const Base64 = require('./Base64.js');
require('./crypto/hmac.js');
require('./crypto/sha1.js');
const Crypto = require('./crypto/crypto.js');

// const UploadAuthObj = JSON.parse(Base64.decode(env.UploadAuth));
// const UploadAddressObj = JSON.parse(Base64.decode(env.UploadAddress));

const uploadFile = function (filePath, fileW, objectId, successCB, errorCB) {
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '视频错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }

  console.log('上传视频…');
  wx.showToast({
    icon:'loading',
    title:'上传中...'
  })
  //const aliyunFileKey = fileW+filePath.replace('wxfile://', '')；
  //const aliyunFileKey = fileW + '' + (new Date().getTime()) + '_' + objectId + '.mp4';
  const aliyunFileKey = env.aliyunFileKey
  // const aliyunServerURL = env.aliyunServerURL;
  // const accessid = env.accessid;
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);
  //console.log('aliyunFileKey=', aliyunFileKey);
   const aliyunServerURL = env.aliyunServerURL;
  //const aliyunServerURL = "https://" + UploadAddressObj.Bucket + "." + UploadAddressObj.Endpoint.replace('https://', '') 
  //const aliyunFileKey = UploadAddressObj.FileName
  //const accessid = UploadAuthObj.AccessKeyId
  //Bucket
  // header: {
  //   'x-oss-acl': 'public-read-write',
  //    
  //       'Content-Type':'video/mp4',
  //         'authorization': 'OSS ' + UploadAuthObj.AccessKeyId,
  //           'Host':'in-15fdcf51624911e8b31e00163e1a65b6.oss-cn-shanghai.aliyuncs.com',
  //             'x-oss-request-id':'719C6220-B9AE-4854-BCE5-82B9E940A30A'
  // },
  wx.uploadFile({
    url: aliyunServerURL, //仅为示例，非真实的接口地址
    filePath: filePath,
    name: 'file',
    formData: {
      'name':filePath,
      'OSSAccessKeyId': env.accessKeyId,
      'policy': policyBase64,
      'Signature': signature,
      'key': aliyunFileKey,
      'success_action_status': '200',
      'x-oss-security-token': env.securityToken
  
    },
    success: function (res) {
      if (res.statusCode != 200) {
        errorCB(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      console.log('上传视频成功', res)
      successCB(aliyunFileKey);
    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      errorCB(err);
    },
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 指定了Post请求必须发生在2020年01月01日12点之前("2020-01-01T12:00:00.000Z")。
    "conditions": [
      ["content-length-range", 0,1048576000] // 设置上传文件的大小限制,1048576000=1000mb
    ]
  };

  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64) {
  //const accesskey = env.accesskey;
  const accesskey = env.accessKeySecret

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

module.exports = uploadFile;