const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/AdminsController");

// Get number of clients
router.get("/number-of-clients", adminController.getNumberOfClient);

// Get number of orders
router.get("/number-of-orders", adminController.getNumberOfOrder);

// Get number of earnings
router.get("/number-of-earnings", adminController.getNumberOfEarnings);

// Get all orders
router.get("/orders", adminController.getAllOrders);

// Update order status
router.put("/orders/:orderId/status", adminController.UpdateStatusOrder);

module.exports = router;
