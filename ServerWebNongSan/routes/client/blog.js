const express = require("express");
const router = express.Router();

const BlogController = require("../../controllers/ClientController");

// Get tag
router.get("/blog/tags", BlogController.GetTag);

// Get all blogs
router.get("/blogs", BlogController.GetAllBlogs);

module.exports = router;
