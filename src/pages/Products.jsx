import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import convertToBase64 from "../utils/convertToBase64";
import { ProductContext } from "../context/product-context/productContext";
import LoadingBox from "../components/Loading/LoadingBox";

const Products = () => {
  const { products, loadingProducts } = useContext(ProductContext);

  return (
    <>
      <Header />
      {loadingProducts ? (
        <LoadingBox />
      ) : (
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
                  <Link
                    to={`/products/${product._id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
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
                      {product?.thumbnail && (
                        <img
                          src={`data:image/png;base64,${convertToBase64(
                            product.thumbnail.data
                          )}`}
                          alt={product.title}
                          style={{
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <Typography
                        variant="h5"
                        component="h6"
                        sx={{ padding: "15px 0" }}
                      >
                        {product.title}
                      </Typography>
                      {product?.description && (
                        <Typography
                          variant="p"
                          component="p"
                          sx={{ mb: "10px" }}
                        >
                          {product.description.substring(0, 30)}...
                        </Typography>
                      )}
                    </Box>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Products;
