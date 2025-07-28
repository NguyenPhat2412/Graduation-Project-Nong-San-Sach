const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotFoundSchema = new Schema(
  {
    img404: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "404",
  }
);

module.exports = mongoose.model("404", NotFoundSchema);
