const connectDB = require("./db");
const express = require("express");
var cors = require("cors");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors());
app.use(fileUpload());
app.use(express.static("static"));

const port = process.env.PORT || 5000;

connectDB();

// middleware
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Available Routes
app.use("/api/product", require("./routes/product.js"));
app.use("/api/cart", require("./routes/cart.js"));

app.listen(port, () => {
  console.log(`Ecommerce backend listening on port ${port}`);
});
