const Order = require("../models/Order");
const Product = require("../models/product");
const User = require("../models/User");
const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");

exports.getNumberOfClient = async (req, res) => {
  try {
    const numberClient = await User.countDocuments({ role: "user" });
    res.status(200).json({ numberClient });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNumberOfOrder = async (req, res) => {
  try {
    const numberOrder = await Order.countDocuments();
    res.status(200).json({ numberOrder });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getNumberOfEarnings = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalEarnings = orders.reduce((acc, order) => {
      return acc + order.totalAmount;
    }, 0);
    res.status(200).json({ totalEarnings });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete user by id
exports.deleteUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// login admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// register admin
exports.registerAdmin = async (req, res) => {
  const { username, email, password, currentPassword } = req.body;
  try {
    const existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const newAdmin = new User({
      username,
      email,
      password,
      role: "admin",
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update products
exports.UpdateProducts = async (req, res) => {
  const { productId } = req.params;
  const { name, price, img, rating, discount, price_old, description } =
    req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, price, img, rating, discount, price_old, description },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// add new product
exports.addNewProduct = async (req, res) => {
  const { name, price, img, rating, discount, price_old, description } =
    req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      img,
      rating,
      discount,
      price_old,
      description,
    });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get product by Id
exports.getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error get product by Id", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// add new blog
exports.addNewBlog = async (req, res) => {
  const {
    title,
    date,
    content,
    banner,
    category,
    numberComment,
    tags,
    author,
    links,
  } = req.body;
  try {
    const newBlog = new Blog({
      title,
      date,
      content,
      banner,
      category,
      numberComment,
      tags,
      author,
      links,
    });
    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", newBlog });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get blog
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit blog
exports.EditBlog = async (req, res) => {
  const { blogId } = req.params;
  const {
    title,
    date,
    content,
    banner,
    category,
    numberComment,
    tags,
    author,
    links,
  } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        date,
        content,
        banner,
        category,
        numberComment,
        tags,
        author,
        links,
      },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete blog
exports.DeleteBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get Blog by ID
exports.getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.GetOrderByOrderId = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
