const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        name: { type: String, required: true },
        img: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
