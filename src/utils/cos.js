import COS from 'cos-js-sdk-v5';
import { eatBizConfig } from 'src/config';


 export async function cosUpload(path, file) {
    
    const cos = new COS({
        SecretId: eatBizConfig.cosSecretId,
        SecretKey: eatBizConfig.cosSecretKey,
    });
    try {
      const data = await cos.uploadFile({
        Bucket: 'easyorder-1301658682', /* 填写自己的 bucket，必须字段 */
        Region: 'ap-guangzhou',     /* 存储桶所在地域，必须字段 */
        Key: path,              /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, 
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData));
        }

      });
      return { err: null, data: data }
    } catch (err) {
      return { err: err, data: null };
    }
  }
  
 