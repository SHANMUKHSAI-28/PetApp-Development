import React, { useState, useContext } from "react";
import { TextField, Button, Grid, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      login(response.data, response.data.accessToken);
      console.log("User type after login:", response.data.userType); // Verify the userType
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "80vh" }}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Grid item>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;