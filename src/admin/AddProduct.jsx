import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, CircularProgress } from "@mui/material";
import Header from "../components/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/product-context/productContext";
import {
  addProductFailed,
  addProductStart,
  addProductSuccess,
} from "../context/product-context/productAction";
import { errorNotify, successNotify } from "../utils/toastify";
import { UserContext } from "../context/user-context/userContext";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const handleUploadThumbnail = (e) => {
    if (e.target.files[0].size > 1000000) {
      return alert("File size is too large. Max size is 1MB");
    }
    if (e.target.files || e.target.files.length !== 0) {
      setThumbnail(e.target.files[0]);

      // Thumbnail Preview
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setThumbnailPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleRemoveThumbnil = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = async (e) => {
    dispatch(addProductStart());
    setLoading(true);
    e.preventDefault();

    if (!title || !price) {
      return alert("Please fill up the form correctly");
    } else {
      let formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("addedBy", user.firstName + " " + user.lastName);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      try {
        const { data } = await axios.post(
          "http://localhost:8080/admin/product/add-product",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (data._id) {
          dispatch(addProductSuccess(data));

          setTitle("");
          setDescription("");
          setPrice(0);
          setThumbnail(null);
          setThumbnailPreview(null);
          setLoading(false);
          successNotify("Product added successfully");
          navigate(`/admin/product/edit-product/${data._id}`);
        } else {
          alert("Something went wrong!");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        dispatch(addProductFailed(error));
        errorNotify("Something went wrong!");
      }
    }
  };
  return (
    <>
      <Header />
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
                  <img
                    src={
                      thumbnailPreview
                        ? thumbnailPreview
                        : "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                    }
                    alt=""
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                  {thumbnail ? (
                    <Button variant="contained" onClick={handleRemoveThumbnil}>
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
                sx={{ padding: "10px 20px", minWidth: "180px" }}
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
                  "Add Product"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddProduct;
