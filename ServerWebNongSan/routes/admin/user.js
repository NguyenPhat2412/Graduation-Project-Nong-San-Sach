const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/AdminsController");

// get all users
router.get("/users", adminController.getAllUser);

// register user
router.post("/register", adminController.registerAdmin);

// login user
router.post("/login", adminController.loginAdmin);

// delete user by id
router.delete("/users/:userId", adminController.deleteUserById);

module.exports = router;
