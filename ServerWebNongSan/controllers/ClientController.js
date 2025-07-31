const Footer = require("../models/Footer");
const Comment = require("../models/Comment");
const New = require("../models/news");
const Product = require("../models/product");
const Category = require("../models/category");
const Cart = require("../models/Cart");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const { default: mongoose } = require("mongoose");

const { sendOrderConfirmationEmail } = require("../utils/emailService");
const { sendContactEmail } = require("../utils/contactService");
const Blogs = require("../models/Blog");
const Contact = require("../models/Contact");
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (error) {
    console.error("Error fetching footer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNews = async (req, res) => {
  try {
    const news = await New.find();
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Product
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Category
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Cart
exports.postCart = async (req, res) => {
  const { userId, products } = req.body;
  try {
    let cart = await Cart({ userId: userId }).populate("products.productId");
    if (!cart) {
      cart = new Cart({ userId, products });
    } else {
      cart.products = products;
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error saving cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get cart by user id
exports.getCartByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.find({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Remove product from cart
exports.RemoveProductFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $pull: {
          products: { productId: new mongoose.Types.ObjectId(productId) },
        },
      },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add to Cart
exports.AddToCart = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const productObjectId = new mongoose.Types.ObjectId(productId);

    let cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productObjectId.toString()
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += Number(quantity);
    } else {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      cart.products.push({
        productId: product._id,
        quantity,
        price: product.price,
        name: product.name,
        img: product.img,
      });
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update product quantity
exports.UpdateProductQuantity = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// User
exports.RegisterUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = new User({ username, password, email });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.cookie("token", token, {
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Logout User
exports.LogoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    path: "/",
  });
  res.status(200).json({ message: "Logout successful" });
};

// Update User
exports.UpdateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;

  const avatarPath = req.file ? `/uploads/avatar/${req.file.filename}` : null;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password, avatar: avatarPath },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Post Order
exports.PostOrder = async (req, res) => {
  const { userId, customer, products, totalAmount } = req.body;

  try {
    const order = new Order({
      userId,
      customer,
      products,
      totalAmount,
    });

    const saveOrder = await order.save();

    // Send confirmation email
    await sendOrderConfirmationEmail(
      order.customer.email,
      order.customer.name,
      order.customer.phone,
      order.customer.address,
      products,
      order.createdAt
    );

    res
      .status(201)
      .json({ message: "Order placed successfully", order: saveOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Order By UserId
exports.GetOrderByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId }).populate("userId", "username");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Order by OrderId
exports.GetOrderByOrderId = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId).populate("userId", "username");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Product by Category

exports.GetProductByCategory = async (req, res) => {
  const categorySlug = req.params.category;

  try {
    const categoryDoc = await Category.findOne({ category: categorySlug });
    console.log(categoryDoc);

    if (!categoryDoc) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({
      category: { $in: categoryDoc.category },
    }).populate("category");

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get product by rating
exports.GetProductByRating = async (req, res) => {
  const rating = req.params.rating;

  try {
    const products = await Product.find({ rating: { $gte: rating } });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found with this rating" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get product by price
exports.GetProductByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.params;

  try {
    const products = await Product.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this price range" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by price:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Tag by Blog
exports.GetTagByBlog = async (req, res) => {
  const tag = req.params.tag;

  try {
    const blogs = await Blogs.find({ tags: tag });
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found with this tag" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Tag
exports.GetTag = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    const tags = new Set();
    blogs.forEach((blog) => {
      blog.tags.forEach((tag) => tags.add(tag));
    });
    res.status(200).json(Array.from(tags));
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all blogs
exports.GetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Post contact
exports.PostContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await sendContactEmail(name, email, subject, message);
    await newContact.save();
    res.status(201).json({ message: "Contact submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
