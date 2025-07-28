const express = require("express");
const router = express.Router();
const clientController = require("../../controllers/ClientController");

// Route to get footer data
router.get("/comment", clientController.getComments);

module.exports = router;
