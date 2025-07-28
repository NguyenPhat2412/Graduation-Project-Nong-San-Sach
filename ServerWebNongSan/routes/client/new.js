const express = require("express");
const router = express.Router();
const clientController = require("../../controllers/ClientController");

// Route to get news data
router.get("/news", clientController.getNews);
module.exports = router;
