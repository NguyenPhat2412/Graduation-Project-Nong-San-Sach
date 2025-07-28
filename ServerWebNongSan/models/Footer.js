const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FooterSchema = new Schema(
  {
    brand: {
      logo: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    sections: [
      {
        title: { type: String, required: true },
        links: [
          {
            label: { type: String, required: true },
            url: { type: String, required: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    collection: "footers",
  }
);

const Footer = mongoose.model("Footer", FooterSchema);
module.exports = Footer;
