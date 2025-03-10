// src/components/Admin/AddVendor.js
import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Grid, Paper } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const AddVendor = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { token } = useContext(AuthContext); // Access the token from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    username,
                    email,
                    password,
                    phone,
                    userType: "Vendor"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in header
                    }
                }
            );
            console.log("Vendor created successfully:", response.data);
            setSuccessMessage("Vendor created successfully!");
            // Optionally, clear the form
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");
        } catch (error) {
            console.error("Error creating vendor:", error);
            setErrorMessage(`Failed to create vendor: ${error.message}. Please check your input.`);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>Add Vendor</Typography>
                {successMessage && (
                    <Typography variant="body1" color="success" style={{ marginBottom: "10px" }}>
                        {successMessage}
                    </Typography>
                )}
                {errorMessage && (
                    <Typography variant="body1" color="error" style={{ marginBottom: "10px" }}>
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required fullWidth />
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">Create Vendor</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddVendor;