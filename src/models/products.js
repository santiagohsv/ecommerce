const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema(
  {
    title: { type: String, require: true, max: 40 },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);
const ProductModel = model("producto", ProductoSchema);

module.exports = { ProductModel };
