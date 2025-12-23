const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3client");

const uploadToS3 = async (file, sessionId) => {
  const key = `uploads/${sessionId}-${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  await s3.send(command);
  return key;
};

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  // Calculate which unit index to use
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // Return the value rounded to 2 decimal places
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const uploadMultipleToS3 = async (files, sessionId) => {
  try {
    const uploadPromises = files.map(async (file) => {
      const key = `uploads/${sessionId}-${file.originalname}`;
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });
      return s3.send(command).then(() => ({
            key, 
            name: file.originalname,
            type: file.mimetype,
      }));
    });
    return Promise.all(uploadPromises);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { uploadMultipleToS3 };