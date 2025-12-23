const router = require("express").Router();
const { uploadFile, getTheFile, uploadMultipleFiles, getAllFiles } = require("../controllers/fileController");
const upload = require("../middlewares/multer");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/get-file", getTheFile);
// max 100 files
router.post("/upload-multiple", upload.array("files", 100), uploadMultipleFiles);
router.get("/get-all-files", getAllFiles);

module.exports = router;