const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema
const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    require: true,
    default: "default.png",
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32,
  },
});

module.exports = mongoose.model("product", productSchema);
