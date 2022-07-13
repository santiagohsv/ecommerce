const { Schema, model } = require("mongoose");

const CartSchema = new Schema(
  {
    productList: { type: Array, require: true },
  },
  { timestamps: true }
);
const CartModel = model("cart", CartSchema);

module.exports = { CartModel };
