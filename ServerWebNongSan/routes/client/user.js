const express = require("express");
const router = express.Router();
const ClientController = require("../../controllers/ClientController");
const { authMiddleware } = require("../../middleware/authMiddleware");
const User = require("../../models/User");
const upload = require("../../middleware/multerMiddleware");

// register user
router.post("/register", ClientController.RegisterUser);

// login user
router.post("/login", ClientController.LoginUser);

// get user before login
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update user by id
router.put(
  "/update-user/:userId",
  authMiddleware,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "img", maxCount: 1 },
  ]),
  ClientController.UpdateUser
);

module.exports = router;
