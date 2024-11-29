const s3 = require('../config/s3config');
class FileService {
  generatePresignedUrl = async(bucketName: string, fileName: string, contentType: string, expiresIn: number = 3600) => {
    const params = {
      Bucket: bucketName,
      Key: fileName, 
      Expires: expiresIn,
      ContentType: contentType, 
    };
  
    try {
      const url = await s3.getSignedUrlPromise('putObject', params);
      return url;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw error;
    }
  }
}

export default new FileService();