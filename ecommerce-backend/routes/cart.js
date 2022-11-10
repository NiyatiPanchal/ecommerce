const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// Route 1 : Add to Cart
router.post("/add", async (req, res) => {
  var success = false;
  try {
    const product = await Product.findById(req.body.productID);

    if (!product) {
      return res.status(404).send("Not Found");
    }

    if (req.body.quantity > product.quantity) {
      return res
        .status(400)
        .json({ success, message: "Please Descrease Quantity" });
    }

    const cart = await new Cart(req.body);
    cart.save();

    success = true;
    res.status(200).json({ success, message: "Product saved successfully" });
  } catch (error) {
    res.status(500).json({ success, error });
  }
});

// Route 2 : Update Quantity
router.put("/updatequantity", async (req, res) => {
  var success = false;
  try {
    const cartProduct = await Cart.findOne({ productID: req.body.productID });
    const product = await Product.findById(req.body.productID);

    if (!cartProduct) {
      return res.status(404).send("Not Found");
    }

    let newQuantity = cartProduct.quantity;

    if (req.body.flag === 0) {
      newQuantity === 1 ? (newQuantity = 1) : (newQuantity = newQuantity - 1);
    } else {
      newQuantity = newQuantity + 1;
    }

    if (newQuantity > product.quantity) {
      return res
        .status(400)
        .json({ success, message: "Please Descrease Quantity" });
    }

    await Cart.findOneAndUpdate(
      { productID: req.body.productID },
      {
        $set: {
          quantity: newQuantity,
        },
      }
    );

    success = true;
    res.status(200).json({ success, message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ success, error });
  }
});

// Route 3 : Delete from Cart
router.delete("/deletefromcart", async (req, res) => {
  try {
    // Find the product to be delete and delete it
    let product = await Cart.findOne({ productID: req.body.productID });

    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }

    product = await Cart.findOneAndDelete({ productID: req.body.productID });

    res
      .status(200)
      .json({ success: true, message: "Product Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Route 4 : Fetch Cart Products
router.get("/fetchallcartproducts", async (req, res) => {
  try {
    const products = await Cart.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
