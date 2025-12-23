const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3client.js");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const { uploadMultipleToS3 } = require("../services/s3Upload.js");
const Image = require("../models/Image.js");

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
  return await getSignedUrl(s3, command, { expiresIn: 3 * 60 * 60 }); //60 sec
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

const uploadMultipleFiles = async (req, res) => {
  try {
    // 1️⃣ Read sessionId properly
    const sessionId = req.headers["x-session-id"];

    if (!sessionId) {
      return res.status(400).json({ message: "Session Id is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // 2️⃣ Upload files to S3
    const uploadedFiles = await uploadMultipleToS3(req.files, sessionId);

    // 3️⃣ Prepare Mongo documents
    const imageDocs = uploadedFiles.map((file) => ({
      sessionId,
      s3Key: file.key,
      originalName: file.name,
      mimeType: file.type,
      sizeBytes: file.size,
    }));

    // 4️⃣ Save metadata
    await Image.insertMany(imageDocs);

    // 5️⃣ Respond
    res.status(200).json({
      success: true,
      files: uploadedFiles,
      sessionId,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const sessionId = req.headers["x-session-id"];

    if (!sessionId) {
      return res.status(400).json({ message: "Session Id is required" });
    }

    // 1️⃣ Fetch images for this session
    const images = await Image.find({
      sessionId,
      isDeleted: false
    }).sort({ createdAt: -1 });

    // 2️⃣ Generate signed URLs in parallel
    const filesWithUrls = await Promise.all(
      images.map(async (img) => ({
        _id: img._id,
        originalName: img.originalName,
        mimeType: img.mimeType,
        sizeBytes: img.sizeBytes,
        createdAt: img.createdAt,
        signedUrl: await getSignedFileUrl(img.s3Key),
      }))
    );

    // 3️⃣ Respond
    res.status(200).json({
      success: true,
      total: filesWithUrls?.length,
      files: filesWithUrls,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error
    });
  }
};


module.exports = { uploadFile, getTheFile, uploadMultipleFiles, getAllFiles };
