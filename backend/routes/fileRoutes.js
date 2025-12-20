const router = require("express").Router();
const { uploadFile, getTheFile } = require("../controllers/fileController");
const upload = require("../middlewares/multer");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/get-file", getTheFile);

module.exports = router;