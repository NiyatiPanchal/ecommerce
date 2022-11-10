import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/header/Header";
import ListProduct from "./Components/product/ListProduct";
import Product from "./Components/product/Product";
import Cart from "./Components/cart/Cart";
import ProductDetail from "./Components/product/ProductDetail";

function App() {
  return (
    <>
      <Header style={{ margin: 0 }} />
      <Outlet />
      <div style={{ marginTop: 50 }}>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<ListProduct />} />
          <Route path="/createProduct" element={<Product />} />
          <Route path="/details/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
