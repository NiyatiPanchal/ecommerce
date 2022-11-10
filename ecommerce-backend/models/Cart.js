const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema
const cartSchema = new Schema({
  productID: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("cart", cartSchema);
