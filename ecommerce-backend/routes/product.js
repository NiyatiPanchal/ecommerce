const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const url = "http://localhost:5000";
const fileUpload = require("express-fileupload");
var path = require("path");

// Route 1 : Upload Image to Local Machine
router.post("/file/upload", async (req, res) => {
  const file = req.files.file;
  const filename = file.name;
  const extension = path.extname(filename);
  const md5 = file.md5;
  const uploadPath = "./static/product_img/" + md5 + extension;
  const URL = url + "/product_img/" + md5 + extension;

  file.mv(uploadPath, (err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "File upload failed", imageURL: URL });
    }
    return res.status(200).send({ message: "File Uploaded", imageURL: URL });
  });
});

// Route 2 : Create Product
router.post("/createproduct", async (req, res) => {
  var success = false;
  try {
    const product = await new Product(req.body);
    product.save();

    success = true;
    res.status(200).json({ success, message: "Product saved successfully" });
  } catch (error) {
    res.status(500).json({ success, error });
  }
});

// Route 3 : Fetch all Product
router.get("/fetchallproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 4 : Fetch Perticular Product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send("Not Found");
    }

    let cart = await Cart.findOne({ productID: req.params.id });
    let isInCart = false;
    if (cart) {
      isInCart = true;
    }

    res.json({ product, isInCart });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
