import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import AddProduct from "./admin/AddProduct";
import { UserContext } from "./context/user-context/userContext";
import axios from "axios";
import { ProductContext } from "./context/product-context/productContext";
import {
  getAllProductsFailed,
  getAllProductsStart,
  getAllProductsSuccess,
} from "./context/product-context/productAction";
import EditProduct from "./admin/EditProduct";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AllUsers from "./admin/AllUsers";
import EditUser from "./admin/EditUser";
import AddUser from "./admin/AddUser";
import AllProducts from "./admin/AllProducts";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PageScroll from "./components/PageScroll";

const App = () => {
  const { user } = useContext(UserContext);
  const { dispatch } = useContext(ProductContext);

  useEffect(() => {
    const getAllProducts = async () => {
      dispatch(getAllProductsStart());
      try {
        const { data } = await axios.get(
          "http://localhost:8080/product/all-products"
        );
        dispatch(getAllProductsSuccess(data));
      } catch (error) {
        console.log(error);
        dispatch(getAllProductsFailed(error));
      }
    };
    getAllProducts();
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <PageScroll/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/signin"
          element={user?.email ? <Navigate to="/" /> : <Signin />}
        />
        <Route
          exact
          path="/signup"
          element={user?.email ? <Navigate to="/" /> : <Signup />}
        />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:productId" element={<SingleProduct />} />

        <Route
          exact
          path="/profile/:userId"
          element={!user?._id ? <Navigate to="/" /> : <Profile />}
        />
        <Route
          exact
          path="/profile/edit-profile/:userId"
          element={!user?._id ? <Navigate to="/" /> : <EditProfile />}
        />
        <Route
          exact
          path="/admin/add-product"
          element={
            user?.role === "administrator" || user?.isAdmin ? (
              <AddProduct />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          exact
          path="/admin/product/edit-product/:productId"
          element={
            user?.role === "administrator" || user?.isAdmin ? (
              <EditProduct />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          exact
          path="/admin/product/all-products"
          element={
            user?.role === "administrator" || user?.isAdmin ? (
              <AllProducts />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          exact
          path="/admin/all-users"
          element={!user?.isAdmin ? <Navigate to="/signin" /> : <AllUsers />}
        />
        <Route
          exact
          path="/admin/add-user"
          element={!user?.isAdmin ? <Navigate to="/signin" /> : <AddUser />}
        />
        <Route
          exact
          path="/admin/edit-user/:userId"
          element={!user?.isAdmin ? <Navigate to="/" /> : <EditUser />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
