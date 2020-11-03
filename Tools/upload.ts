import config from '../config/config';
const qiniu = require('qiniu');
const stream = require('stream');

const {accessKey, secretKey, scope, scopeBashSource} = config;
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);   
const options = {
    scope
};
const putPolicy = new qiniu.rs.PutPolicy(options);

const qiniuUpload = (stream, fname):Promise<String> => new Promise((resolve, reject) => {
  const uploadToken = putPolicy.uploadToken(mac);
  const formUploader = new qiniu.form_up.FormUploader({uploadToken});
  const putExtra = new qiniu.form_up.PutExtra();
    formUploader.putStream(uploadToken, fname, stream, putExtra, (respErr, respBody, respInfo)=> {
      if (respErr) {
          reject(respErr);
      } else {
          if (respInfo.statusCode === 200) {
              const filePath = scopeBashSource + respBody.key;
              resolve(filePath);
          } else {
              reject(respBody);
          }
      }
    });
});

/**
 * 
 * @param {String} filepath 文件路径
 * @param {String} loadPath 上传到服务器的文件路径
 * @param {Function} cb 回调函数
 */
async function upload (buffer, fname):Promise<String> {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);
  try {
    const result = await qiniuUpload(bufferStream, fname);
    return result;
   } catch (err) {
     console.log (err);
   }
}

export default upload