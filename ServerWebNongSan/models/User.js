const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "/uploads/avatar/default.png" },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
