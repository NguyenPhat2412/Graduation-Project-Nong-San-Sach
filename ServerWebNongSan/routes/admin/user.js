const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/AdminsController");

// get all users
router.get("/users", adminController.getAllUser);

// delete user by id
router.delete("/users/:userId", adminController.deleteUserById);

module.exports = router;
