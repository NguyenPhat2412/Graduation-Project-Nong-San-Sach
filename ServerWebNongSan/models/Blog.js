const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: String, required: true },
    banner: { type: String, required: true },
    numberComment: { type: Number, default: 0 },
    links: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "blog",
  }
);

const Blogs = mongoose.model("Blog", Blog);
module.exports = Blogs;
