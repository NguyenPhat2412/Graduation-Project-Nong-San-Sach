const express = require("express");
const router = express.Router();

const ClientController = require("../../controllers/ClientController");

// get products
router.get("/products", ClientController.getProducts);

// get categories
router.get("/categories", ClientController.getCategories);

// get cart
router.post("/cart", ClientController.postCart);

// get cart by userId
router.get("/cart/:userId", ClientController.getCartByUserId);

// remove product from cart
router.delete(
  "/cart/:userId/:productId",
  ClientController.RemoveProductFromCart
);

// update product quantity in cart
router.put("/cart/:userId/:productId", ClientController.UpdateProductQuantity);

// add product to cart
router.post("/cart/:userId/:productId", ClientController.AddToCart);

router.post("/order", ClientController.PostOrder);

// get orders by userId
router.get("/orders/:userId", ClientController.GetOrderByUserId);

// get order by orderId
router.get("/order/:orderId", ClientController.GetOrderByOrderId);

// get products by category
router.get(
  "/products/category/:category",
  ClientController.GetProductByCategory
);

// get product by rating
router.get("/products/rating/:rating", ClientController.GetProductByRating);

// get product by price
router.get(
  "/products/price/minPrice=:minPrice&maxPrice=:maxPrice",
  ClientController.GetProductByPrice
);

// post recently viewed products
router.post("/recently-viewed/:userId", ClientController.recentlyViewedProduct);

// get recently viewed products
router.get(
  "/recently-viewed/:userId",
  ClientController.getRecentlyViewedProducts
);
module.exports = router;
