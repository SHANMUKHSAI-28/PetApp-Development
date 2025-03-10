// pet-app-frontend\src\components\Vendor\AddPet.js
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
        petsshop: "659cdb97938043e4e56f28ca", // Replace with valid ObjectId
        userId: "659cdb97938043e4e56f28c9",  // Replace with valid ObjectId
        imageurl: [], // Initialize as an empty array
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
        Contact_Number: "1234567890" // Ensure this is a 10-digit STRING
    });
    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Split the comma-separated string into an array, remove whitespace
            const imageArray = productDetails.imageurl
                ? productDetails.imageurl.split(",").map(url => url.trim())
                : [];

            // Validate that imageArray has 1-4 images.
            if (imageArray.length < 1 || imageArray.length > 4) {
                alert("You must provide between 1 and 4 image URLs.");
                return;  // Stop submission
            }

            // Prepare the product data
            const productData = {
                ...productDetails,
                imageurl: imageArray,
            };

            const response = await axios.post("http://localhost:5000/api/products", productData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Product added successfully!");
            // Optionally, clear the form or redirect
            console.log("Product added successfully:", response.data); // Log the response
        } catch (error) {
            console.error("Error adding product:", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
                alert(`Failed to add product. Status: ${error.response.status}. See console for details.`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
                alert("Failed to add product. No response from server.");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error message:", error.message);
                alert(`Failed to add product. Error: ${error.message}`);
            }
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