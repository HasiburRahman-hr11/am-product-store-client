import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import axios from "axios";
import { errorNotify, successNotify } from "../utils/toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      errorNotify("Please fill the form properly!");
      return;
    }
    if (password.length < 5) {
      return alert("Password must be at least 5 charecters");
    }

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://am-product-store.onrender.com/user/add-user",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data._id) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRole("");
        setProfilePicture("");
        setProfilePicturePreview("");
        setLoading(false);
        successNotify("User added successfully");
        navigate(`/admin/edit-user/${data._id}`);
      } else {
        errorNotify("Something went wrong!");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      errorNotify(error?.response?.data?.message || "Somthing went wrong!");
    }
  };

  const handleUploadPicture = (e) => {
    setProfilePicturePreview(URL.createObjectURL(e.target.files[0]));
    setProfilePicture(e.target.files[0]);
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    setProfilePicturePreview(null);
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
            <Box
              sx={{
                maxWidth: "400px",
                margin: "0 auto 60px auto",
                textAlign: "center",
              }}
            >
              <Box component="div">
                <img
                  src={
                    profilePicturePreview
                      ? profilePicturePreview
                      : "https://archive.org/download/placeholder-image/placeholder-image.jpg"
                  }
                  alt="Thumbnail"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    margin: "0 auto",
                    display: "blocks",
                  }}
                />
              </Box>
              <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                {profilePicture ? (
                  <Button variant="contained" onClick={handleRemovePicture}>
                    Remove
                  </Button>
                ) : (
                  <Button
                    component="label"
                    sx={{
                      background: "#C6D9F8",
                    }}
                  >
                    Profile Picture
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleUploadPicture(e)}
                    />
                  </Button>
                )}
              </Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  type="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    autoComplete="false"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    label="Role"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value="subscriber">Subscriber</MenuItem>
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
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
                  "Add User"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
