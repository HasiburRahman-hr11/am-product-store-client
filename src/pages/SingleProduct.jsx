import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../components/Header/Header";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import convertToBase64 from "../utils/convertToBase64";
import { UserContext } from "../context/user-context/userContext";
import MessageModal from "../components/MessageModal/MessageModal";

const SingleProduct = () => {
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);


  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenMOdal = () => {
    if(user?._id === product?.user?._id){
      return alert('You cannot send message to yourself!');
    }
    setOpenModal(true);
  }
  const handleCloseModal = () => setOpenModal(false);

  

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
          <MessageModal openModal={openModal} handleCloseModal={handleCloseModal} receiver={product?.user?._id} />
          <Container>
            {user?._id && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", margin: "30px 0" }}
                >
                  Author:
                  <Typography component="span" 
                  onClick={handleOpenMOdal}
                  sx={{
                    color:'#2D7CEE',
                    cursor:'pointer'
                  }}> {product?.user?.firstName + " " + product?.user?.lastName}</Typography>
                </Typography>
              </Box>
            )}
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
              sx={{ textAlign: "center", margin: "30px 0" }}
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
