import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../components/Header/Header";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import convertToBase64 from "../utils/convertToBase64";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/product/get-product/${params.productId}`
        );
        setProduct(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (params.productId) {
      getProduct();
    }
  }, [params.productId]);
  return (
    <>
      <Header />
      {loading ? (
        <Typography
          variant="h2"
          sx={{ textAlign: "center", padding: "10rem 0" }}
        >
          Loading..
        </Typography>
      ) : (
        <Box
          sx={{
            marginTop: "100px",
          }}
        >
          <Container>
            {product?.thumbnail && (
              <Box
                sx={{
                  maxWidth: "1080px",
                  margin: "0 auto",
                }}
              >
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
              </Box>
            )}

            <Typography
              variant="h2"
              component="h2"
              sx={{ textAlign: "center" }}
            >
              {" "}
              {product.title}
            </Typography>
            {product?.description && (
              <Typography
                variant="p"
                component="p"
                sx={{ textAlign: "justify" }}
              >
                {product.description}
              </Typography>
            )}
          </Container>
        </Box>
      )}
    </>
  );
};

export default SingleProduct;
