const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
        rating: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
    collection: "cart",
  }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
