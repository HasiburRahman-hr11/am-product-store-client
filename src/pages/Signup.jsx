import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";

const textFieldStyle = {
  width: "100%",
  marginTop: "20px",
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !password) {
      return alert("Please fill up the form correctly");
    }
    if (password.length < 5) {
      return alert("Password must be at least 5 charecters");
    }
    let userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log(userData);
  };

  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          minHeight: "100vh",
          paddingTop:'30px'
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "450px",
            background: "#fff",
            padding: "30px 30px",
            borderRadius: "10px",
            margin: "0 auto",
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: "#1976D2",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Signup
          </Typography>

          <TextField
            sx={textFieldStyle}
            id="firstName"
            label="First Name"
            variant="standard"
            autoComplete="false"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={textFieldStyle}
            id="lastName"
            label="First Name"
            variant="standard"
            autoComplete="false"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            sx={textFieldStyle}
            id="email"
            label="Email"
            variant="standard"
            autoComplete="false"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={textFieldStyle}
            id="password"
            label="Password"
            type="password"
            variant="standard"
            autoComplete="false"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Box sx={{ mt: "30px", textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ padding: "10px 20px", minWidth: "100px" }}
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
                "Signup"
              )}
            </Button>
          </Box>

          <Typography
            variant="h6"
            component="h6"
            sx={{ mt: "30px", textAlign: "center" }}
          >
            Or <Link to="/signin">Signin</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
