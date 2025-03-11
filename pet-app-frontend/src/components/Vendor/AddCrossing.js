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

const AddCrossing = () => {
    const [crossingDetails, setCrossingDetails] = useState({
        Category: "",
        Breed_name: "",
        Gender: "",
        Quality: "",
        imageurl: "",
        mating_video: "",
        Breeder_Name: "",
        aadhar_Number: "",
        Address: "",
        status: "available",
        Contact_Number: "",
        vaccination: "",
        location: "",
        age: 0,
        Breed_lineage: "",
        userid: ""
    });
    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        setCrossingDetails({ ...crossingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/crossings", crossingDetails, { // Changed endpoint
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Crossing added successfully!");
            console.log("Crossing added successfully:", response.data);
            // Optionally, clear the form or redirect
            setCrossingDetails({
                Category: "",
                Breed_name: "",
                Gender: "",
                Quality: "",
                imageurl: "",
                mating_video: "",
                Breeder_Name: "",
                aadhar_Number: "",
                Address: "",
                status: "available",
                Contact_Number: "",
                vaccination: "",
                location: "",
                age: 0,
                Breed_lineage: "",
                userid: ""
            }); // Clear the form
        } catch (error) {
            console.error("Error adding crossing:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                alert(`Failed to add crossing. Status: ${error.response.status}. See console for details.`);
            } else if (error.request) {
                console.error("No response received:", error.request);
                alert("Failed to add crossing. No response from server.");
            } else {
                console.error("Error message:", error.message);
                alert(`Failed to add crossing. Error: ${error.message}`);
            }
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>Add Crossing</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <TextField label="Category" name="Category" value={crossingDetails.Category} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breed Name" name="Breed_name" value={crossingDetails.Breed_name} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select labelId="gender-label" id="Gender" name="Gender" value={crossingDetails.Gender} onChange={handleChange} required>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField label="Quality" name="Quality" value={crossingDetails.Quality} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Image URL" name="imageurl" value={crossingDetails.imageurl} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Crossing Video URL" name="mating_video" value={crossingDetails.mating_video} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breeder Name" name="Breeder_Name" value={crossingDetails.Breeder_Name} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Aadhar Number" name="aadhar_Number" type="number" value={crossingDetails.aadhar_Number} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Address" name="Address" value={crossingDetails.Address} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select labelId="status-label" id="status" name="status" value={crossingDetails.status} onChange={handleChange} required>
                                    <MenuItem value="available">Available</MenuItem>
                                    <MenuItem value="unavailable">Unavailable</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField label="Contact Number" name="Contact_Number" value={crossingDetails.Contact_Number} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Vaccination" name="vaccination" value={crossingDetails.vaccination} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Location" name="location" value={crossingDetails.location} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Age" name="age" type="number" value={crossingDetails.age} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breed Lineage" name="Breed_lineage" value={crossingDetails.Breed_lineage} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="User ID" name="userid" value={crossingDetails.userid} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">Add Crossing</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddCrossing;