import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("Client");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for phone number length
    if (phone.length !== 10) {
      alert("Phone number must be 10 digits.");
      return;
    }

    try {
      console.log("Sending registration request...");
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        phone,
        userType,
      });

      console.log("Registration successful!", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Response Data:", error.response.data);
        console.log("Response Status:", error.response.status);

        // Extract the error message from the backend if available
        let errorMessage = "Registration failed. Please check your input."; // Default
        if (error.response.data && error.response.data.errors) {
          // Accumulate all error messages if express-validator format
          errorMessage = error.response.data.errors.map(err => Object.values(err)[0]).join("\n");

        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Generic message from backend
        }
        alert(errorMessage);

      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
        alert("Registration failed: No response from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        alert("Registration failed: " + error.message);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: "80vh" }}>
        <Typography variant="h4">Register</Typography>
        <form onSubmit={handleSubmit}>
          <Grid item>
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              inputProps={{ maxLength: 10 }} // Limit input to 10 characters
            />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="user-type-label">User Type</InputLabel>
              <Select labelId="user-type-label" id="user-type-select" value={userType} label="User Type" onChange={(e) => setUserType(e.target.value)}>
                <MenuItem value="Client">Client</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
                <MenuItem value="Driver">Driver</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Register;