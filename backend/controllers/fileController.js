const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3client.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const uploadToS3 = async (file) => {
  const key = `uploads/${Date.now()}-${file.originalname}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  await s3.send(command);
  return key;
};

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const s3key = await uploadToS3(req.file);
    return res.status(201).json({
      success: true,
      message: "File uploaded",
      key: s3key,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

const getSignedFileUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3, command, { expiresIn: 60 }); //60 sec
};
const getTheFile = async (req, res) => {
  try {
    const { key } = req.query;
    const url = await getSignedFileUrl(key);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = { uploadFile, getTheFile };
