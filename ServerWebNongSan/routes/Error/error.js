const express = require("express");
const router = express.Router();
const ErrorController = require("../../controllers/Error");

router.get("/404", ErrorController.get404Page);

module.exports = router;
