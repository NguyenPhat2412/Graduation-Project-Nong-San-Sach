const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    img: { type: String, required: true },
    discount: { type: Number },
    price_old: { type: Number },
    banner: { type: String },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    description: { type: String },
  },
  {
    timestamps: true,
    collection: "product",
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
