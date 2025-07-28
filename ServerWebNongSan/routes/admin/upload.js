const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();

if (!fs.existsSync(path.join(__dirname, "../../uploads/products"))) {
  fs.mkdirSync(path.join(__dirname, "../../uploads/products"), {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads/products"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "avatar", maxCount: 1 },
  ]),
  (req, res) => {
    if (!req.files || !req.files.img) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = `/uploads/products/${req.files.filename}`;
    res.status(200).json({ message: "File uploaded successfully", filePath });
  }
);

router.post("/upload-multiple", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }
  const filePaths =
    req.files.length === 1
      ? `/uploads/products/${req.files[0].filename}`
      : req.files.map((file) => `/uploads/products/${file.filename}`);

  res.status(200).json({ message: "Files uploaded successfully", filePaths });
});

module.exports = router;
