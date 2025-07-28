const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/avatar"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append original file extension
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
