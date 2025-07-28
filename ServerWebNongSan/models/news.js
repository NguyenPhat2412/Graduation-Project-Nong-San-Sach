const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: String, required: true },
    banner: { type: String, required: true },
    numberComment: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: "news",
  }
);

const New = mongoose.model("New", NewSchema);
module.exports = New;
