import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import Header from "../components/Header/Header";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleUploadThumbnail = (e) => {
    if (e.target.files || e.target.files.length !== 0) {
      setThumbnail(e.target.files[0]);
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setThumbnailPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleRemoveThumbnil = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const handleSubmit = () => {
    const productData = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
    };

    console.log(productData);
    setTitle("");
    setDescription("");
    setPrice(0);
    setThumbnail(null);
    setThumbnailPreview(null);
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
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={8}>
              <TextField
                name="title"
                label="Product Title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            <Button variant="contained" onClick={handleSubmit}>
              Add Product
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddProduct;
