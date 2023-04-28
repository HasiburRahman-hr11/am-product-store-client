import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, CircularProgress } from "@mui/material";
import Header from "../components/Header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/product-context/productContext";
import convertToBase64 from "../utils/convertToBase64";
import {
  editProductsFailed,
  editProductsStart,
  editProductsSuccess,
} from "../context/product-context/productAction";
import { errorNotify, successNotify } from "../utils/toastify";
import LoadingBox from "../components/Loading/LoadingBox";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [base64Thumb, setBase64Thumb] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const { dispatch } = useContext(ProductContext);

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(editProductsStart());
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const { data } = await axios.put(
        `https://am-product-store.onrender.com/admin/product/edit-product/${params.productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data) {
        console.log(data);
        dispatch(editProductsSuccess(data));
        setLoading(false);
        successNotify("Product updated successfully");
      } else {
        errorNotify("Something went wrong!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(editProductsFailed(error));
      setLoading(false);
      errorNotify("Something went wrong");
    }
  };
  const handleUploadThumbnail = (e) => {
    setBase64Thumb("");
    setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
    setThumbnail(e.target.files[0]);
  };

  const handleRemoveThumbnil = () => {
    setBase64Thumb("");
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://am-product-store.onrender.com/product/get-product/${params.productId}`
        );
        setTitle(data.title);
        setDescription(data?.description || "");
        setPrice(data.price);
        if (data?.thumbnail) {
          setBase64Thumb(convertToBase64(data.thumbnail.data));
        }
        setLoadingProduct(false);
      } catch (error) {
        console.log(error);
        setLoadingProduct(false);
      }
    };
    if (params.productId) {
      getProduct();
    }
  }, [params.productId]);

  return (
    <>
      <Header />
      {loadingProduct ? (
        <LoadingBox />
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            marginTop: "100px",
          }}
        >
          <Box
            sx={{
              background: "#fff",
              maxWidth: "900px",
              margin: "0 auto",
              padding: "30px 30px",
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={8}>
                  <TextField
                    name="title"
                    label="Product Title"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <TextField
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ margin: "20px 0" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <TextField
                    name="price"
                    label="Product Price"
                    variant="outlined"
                    type="number"
                    min={0}
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Box component="div">
                    {base64Thumb ? (
                      <img
                        src={`data:image/png;base64,${base64Thumb}`}
                        alt="Thumbnail"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <img
                        src={
                          thumbnailPreview
                            ? thumbnailPreview
                            : "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                        }
                        alt="Thumbnail"
                        style={{ width: "100%" }}
                      />
                    )}
                  </Box>
                  <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                    {thumbnail || base64Thumb ? (
                      <Button
                        variant="contained"
                        onClick={handleRemoveThumbnil}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        component="label"
                        sx={{
                          background: "#C6D9F8",
                        }}
                      >
                        Product Thumbnail
                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleUploadThumbnail(e)}
                        />
                      </Button>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: "20px", textAlign: "center" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ padding: "10px 20px", minWidth: "150px" }}
                >
                  {loading ? (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                        width: "25px !important",
                        height: "25px !important",
                      }}
                    />
                  ) : (
                    "Update"
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default EditProduct;
