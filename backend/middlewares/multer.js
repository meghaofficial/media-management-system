const multer = require("multer");
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

  // Allow all images
  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  // Allow specific non-image types
  const allowedTypes = [
    "application/pdf",
    "video/mp4",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("File type not allowed"), false);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter,
});

module.exports = upload;