const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    collection: "categories",
  }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
