const express = require("express");
const router = express.Router();

const BlogController = require("../../controllers/AdminsController");

// add new blog
router.post("/blog", BlogController.addNewBlog);

// get all blogs
router.get("/blogs", BlogController.getAllBlogs);

// edit blog
router.put("/blog/:blogId", BlogController.EditBlog);

// delete blog
router.delete("/blog/:blogId", BlogController.DeleteBlog);

// get blogs by id
router.get("/blogs/:blogId", BlogController.getBlogById);

module.exports = router;
