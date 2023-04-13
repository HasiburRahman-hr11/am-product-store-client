import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";

const products = [
  {
    _id: "001",
    title: "Product Title 1",
    description: "Product description 1",
    thumbnail:
      "https://images.pexels.com/photos/3752194/pexels-photo-3752194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    addedBy: "userid01",
    price: 2500,
  },
  {
    _id: "002",
    title: "Product Title 2",
    description: "Product description 2",
    thumbnail:
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    addedBy: "userid02",
    price: 2200,
  },
  {
    _id: "003",
    title: "Product Title 3",
    description: "Product description 3",
    thumbnail:
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    addedBy: "userid03",
    price: 2800,
  },
  {
    _id: "004",
    title: "Product Title 4",
    description: "Product description 4",
    thumbnail:
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    addedBy: "userid04",
    price: 2800,
  },
  {
    _id: "005",
    title: "Product Title 5",
    description: "Product description 5",
    thumbnail:
      "https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    addedBy: "userid05",
    price: 2800,
  },
];

const Products = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          marginTop: "100px",
        }}
      >
        <Container>
          <Grid container sx={{ width: "100%" }} spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Link to={`/products/${product._id}`} style={{color:'inherit' , textDecoration:'none'}}>
                <Box
                  component="div"
                  sx={{
                    padding: "10px 10px",
                    background: "#fff",
                    borderRadius: "5px",
                    textAlign: "center",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h6"
                    sx={{ padding: "15px 0" }}
                  >
                    {product.title}
                  </Typography>
                  <Typography variant="p" component="p" sx={{ mb: "10px" }}>
                    {product.description.substring(0, 20)}...
                  </Typography>
                </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Products;
