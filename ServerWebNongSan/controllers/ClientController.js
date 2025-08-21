const Footer = require("../models/Footer");
const Comment = require("../models/Comment");
const New = require("../models/news");
const Product = require("../models/product");
const Category = require("../models/category");
const Cart = require("../models/Cart");
const User = require("../models/User");
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { default: mongoose } = require("mongoose");

const { sendOrderConfirmationEmail } = require("../utils/emailService");
const { sendContactEmail } = require("../utils/contactService");
const Blogs = require("../models/Blog");
const Contact = require("../models/Contact");

let otpStore = {};

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

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

    if (!userId) {
      res
        .status(403)
        .json({ message: "Bạn cần đăng nhập để thực hiện hành động này" });
    }

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
    if (!username || !password || !email) {
      return res.status(400).json({ message: "Phải điền đầy đủ thông tin!" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Định dạng email không hợp lệ" });
    }
    const existingUser = await User.findOne({ email, role: "user" });

    if (existingUser) {
      return res.status(409).json({ message: "Email đã được sử dụng" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ message: "Đăng ký người dùng thành công" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Lỗi hệ thống!" });
  }
};

exports.LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, role: "user" });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "Vui lòng kiểm tra lại email hoặc mật khẩu!" });
    }

    const otp = generateOTP();
    otpStore[user.email] = { otp, expires: Date.now() + 300 * 1000 };

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: user.email,
      subject: "Mã xác thực OTP",
      text: `Mã xác thực OTP của bạn là ${otp}. Nó sẽ hết hạn trong 5 phút.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
      } else {
        console.log("OTP email sent:", info.response);
      }
    });
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
    res.status(200).json({ message: "Cập nhật OTP để tiếp tục", token });
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

  const avatarPath = req.files?.avatar?.[0]
    ? `/uploads/avatar/${req.files?.avatar[0]?.filename}`
    : null;

  const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, password: passwordHash, avatar: avatarPath },
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
    if (!userId) {
      return res
        .status(403)
        .json({ message: "Bạn cần đăng nhập để thực hiện hành động này" });
    }

    if (userId) {
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
    }
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

// Recently Viewed
exports.recentlyViewedProduct = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.recentlyViewed) {
      user.recentlyViewed = [];
    }

    if (!user.recentlyViewed.includes(productId)) {
      user.recentlyViewed.push(productId);
      if (user.recentlyViewed.length > 5) {
        user.recentlyViewed.shift();
      }
    }

    await user.save();
    res.status(200).json({ message: "Product added to recently viewed" });
  } catch (error) {
    console.error("Error adding product to recently viewed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRecentlyViewedProducts = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate("recentlyViewed");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.recentlyViewed);
  } catch (error) {
    console.error("Error fetching recently viewed products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.PostComment = async (req, res) => {
  const { userId, blogId, avatar, name, email, comment } = req.body;

  try {
    const newComment = new Comment({
      userId,
      blogId,
      avatar,
      name,
      email,
      comment,
    });
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment posted successfully", comment: newComment });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get comments by blogId
exports.GetCommentsByBlogId = async (req, res) => {
  const { blogId } = req.params;

  try {
    const comments = await Comment.find({ blogId }).populate(
      "userId",
      "username"
    );
    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this blog" });
    }
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments by blog ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// verify otp
exports.VerifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ message: "Email and OTP đều không được để trống" });
  }

  const storedOTP = otpStore[email];

  if (!storedOTP) {
    return res.status(400).json({ message: "Mã OTP không hợp lệ" });
  }

  if (storedOTP.otp !== otp) {
    return res.status(400).json({ message: "Mã OTP không chính xác" });
  }

  if (Date.now() > storedOTP.expires) {
    delete otpStore[email];
    return res.status(400).json({ message: "Mã OTP đã hết hạn" });
  }

  delete otpStore[email];
  res.status(200).json({ message: "Xác thực OTP thành công" });
};

exports.numberCommentTotal = async (req, res) => {
  const { blogId } = req.params;
  try {
    const totalComments = await Comment.countDocuments({ blogId });
    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const numberComment = totalComments;

    // update blog with new comment count
    blog.numberComment = numberComment;
    await blog.save();
    res.status(200).json({ totalComments });
  } catch (error) {
    console.error("Error fetching comment count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
