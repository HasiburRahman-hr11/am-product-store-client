import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductContext } from "../context/product-context/productContext";
import { Link } from "react-router-dom";
import { errorNotify, successNotify } from "../utils/toastify";
import axios from "axios";
import {
  deleteProductFailed,
  deleteProductStart,
  deleteProductSuccess,
} from "../context/product-context/productAction";
import Header from "../components/Header/Header";

const AllProducts = () => {
  const { products, dispatch } = useContext(ProductContext);

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Delete this product?")) {
      dispatch(deleteProductStart());
      try {
        const { data } = await axios.delete(
          `https://am-product-store.onrender.com/admin/product/delete-product/${productId}`
        );
        if (data) {
          dispatch(deleteProductSuccess(data));
          successNotify("Product deleted successfully.");
        }
      } catch (error) {
        console.log(error);
        dispatch(deleteProductFailed(error));
        errorNotify("Something went wrong!");
      }
    }
  };
  return (
    <>
      <Header />
      {products.length < 1 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Typography variant="h2" sx={{ textAlign: "center", width: "100%" }}>
            No Products Found
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            padding: "80px 0",
          }}
        >
          <Container>
            <Typography variant="h2" sx={{ textAlign: "center", mb: "50px" }}>
              All Products
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "max-content" }}>S.N</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Added By</TableCell>
                    <TableCell align="center">Added On</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow
                      key={product._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "max-content" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell align="center">${product.price}</TableCell>
                      <TableCell align="center">{product?.user?.firstName + " " + product?.user?.lastName}</TableCell>
                      <TableCell align="center">
                        {new Date(product.createdAt).toDateString()}
                      </TableCell>
                      <TableCell align="center">
                        <Link to={`/admin/product/edit-product/${product._id}`}>
                          <EditIcon sx={{ cursor: "pointer", color: "#444" }} />
                        </Link>
                        <DeleteIcon
                          onClick={() => handleDeleteProduct(product._id)}
                          sx={{
                            marginLeft: "18px",
                            cursor: "pointer",
                            color: "#E43E31",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      )}
    </>
  );
};

export default AllProducts;
