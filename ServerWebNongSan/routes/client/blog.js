const express = require("express");
const router = express.Router();

const BlogController = require("../../controllers/ClientController");

// Get tag
router.get("/blog/tags", BlogController.GetTag);

// Get all blogs
router.get("/blogs", BlogController.GetAllBlogs);

// get Blog by Id
router.get("/blogs/:blogId", BlogController.getBlogById);
// post comment
router.post("/blog/comment", BlogController.PostComment);

// get comments by blogId
router.get("/blog/comments/:blogId", BlogController.GetCommentsByBlogId);

// get number of comments by blogId
router.get("/blog/comments/number/:blogId", BlogController.numberCommentTotal);

module.exports = router;
