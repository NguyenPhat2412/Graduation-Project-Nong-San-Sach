const Error = require("../models/Error");
const fs = require("fs");
exports.get404Page = async (req, res) => {
  try {
    const notFoundData = await Error.find();
    res.status(200).json(notFoundData);
  } catch (error) {
    console.error("Error fetching 404 page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
