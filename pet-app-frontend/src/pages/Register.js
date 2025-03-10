import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("Client"); // Default value
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        phone,
        userType,
      });
      navigate("/login"); // Redirect to login page after registration
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed");
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
            <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
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