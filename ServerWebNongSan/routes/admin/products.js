const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/AdminsController");

// Get all products
router.get("/products", adminController.getAllProducts);

// Update a product
router.put("/products/:productId", adminController.UpdateProducts);

// get product by Id
router.get("/products/:productId", adminController.getProductById);

// add a new product
router.post("/products", adminController.addNewProduct);

module.exports = router;
