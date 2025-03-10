import React, { useState, useContext } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Container,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const AddPet = () => {
    const [productDetails, setProductDetails] = useState({
        petsshop: "",
        userId: "",
        imageurl: "",
        Breed_name: "",
        quality: "",
        price: 0,
        category: "",
        petParentsMatingVideo: "",
        Breed_lineage: "",
        Address: "",
        Gender: "",
        status: "available",
        location: "",
        age: 0,
        vaccination: "",
        Breeder_Name: "",
        Contact_Number: ""
    });
    const { token } = useContext(AuthContext); // Access the token from AuthContext

    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Use the /api/products endpoint and send the product details
            await axios.post("http://localhost:5000/api/products", productDetails, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in header
                }
            });
            alert("Product added successfully!");
            // Optionally, clear the form or redirect
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product.");
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>Add Pet (Product)</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <TextField label="Pet Shop ID" name="petsshop" value={productDetails.petsshop} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="User ID" name="userId" value={productDetails.userId} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Image URLs (comma separated)" name="imageurl" value={productDetails.imageurl} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breed Name" name="Breed_name" value={productDetails.Breed_name} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Quality" name="quality" value={productDetails.quality} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Price" name="price" type="number" value={productDetails.price} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select labelId="category-label" id="category" name="category" value={productDetails.category} onChange={handleChange} required>
                                    <MenuItem value="dog">Dog</MenuItem>
                                    <MenuItem value="cat">Cat</MenuItem>
                                    <MenuItem value="bird">Bird</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField label="Pet Parents Mating Video URL" name="petParentsMatingVideo" value={productDetails.petParentsMatingVideo} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breed Lineage" name="Breed_lineage" value={productDetails.Breed_lineage} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Address" name="Address" value={productDetails.Address} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select labelId="gender-label" id="Gender" name="Gender" value={productDetails.Gender} onChange={handleChange} required>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select labelId="status-label" id="status" name="status" value={productDetails.status} onChange={handleChange} required>
                                    <MenuItem value="available">Available</MenuItem>
                                    <MenuItem value="unavailable">Unavailable</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField label="Location" name="location" value={productDetails.location} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Age" name="age" type="number" value={productDetails.age} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Vaccination" name="vaccination" value={productDetails.vaccination} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breeder Name" name="Breeder_Name" value={productDetails.Breeder_Name} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Contact Number" name="Contact_Number" value={productDetails.Contact_Number} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">Add Product</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddPet;