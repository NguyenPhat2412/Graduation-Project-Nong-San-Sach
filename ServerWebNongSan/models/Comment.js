const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    img: { type: String, required: true },
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: "comment",
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
