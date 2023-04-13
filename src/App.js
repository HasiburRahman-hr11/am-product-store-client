import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import AddProduct from "./admin/AddProduct";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:id" element={<SingleProduct />} />
        <Route exact path="/admin/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
