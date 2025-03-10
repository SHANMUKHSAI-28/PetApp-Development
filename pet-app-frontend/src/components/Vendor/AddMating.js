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

const AddMating = () => {
    const [matingDetails, setMatingDetails] = useState({
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
        setMatingDetails({ ...matingDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/matings", matingDetails, { // Changed endpoint
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Mating added successfully!");
            console.log("Mating added successfully:", response.data);
            // Optionally, clear the form or redirect
            setMatingDetails({
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
            console.error("Error adding mating:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                alert(`Failed to add mating. Status: ${error.response.status}. See console for details.`);
            } else if (error.request) {
                console.error("No response received:", error.request);
                alert("Failed to add mating. No response from server.");
            } else {
                console.error("Error message:", error.message);
                alert(`Failed to add mating. Error: ${error.message}`);
            }
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>Add Mating</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <TextField label="Category" name="Category" value={matingDetails.Category} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breed Name" name="Breed_name" value={matingDetails.Breed_name} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="gender-label">Gender</InputLabel>
                                <Select labelId="gender-label" id="Gender" name="Gender" value={matingDetails.Gender} onChange={handleChange} required>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField label="Quality" name="Quality" value={matingDetails.Quality} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Image URL" name="imageurl" value={matingDetails.imageurl} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Mating Video URL" name="mating_video" value={matingDetails.mating_video} onChange={handleChange} fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breeder Name" name="Breeder_Name" value={matingDetails.Breeder_Name} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Aadhar Number" name="aadhar_Number" type="number" value={matingDetails.aadhar_Number} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Address" name="Address" value={matingDetails.Address} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <FormControl fullWidth>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select labelId="status-label" id="status" name="status" value={matingDetails.status} onChange={handleChange} required>
                                    <MenuItem value="available">Available</MenuItem>
                                    <MenuItem value="unavailable">Unavailable</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField label="Contact Number" name="Contact_Number" value={matingDetails.Contact_Number} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Vaccination" name="vaccination" value={matingDetails.vaccination} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Location" name="location" value={matingDetails.location} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Age" name="age" type="number" value={matingDetails.age} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="Breed Lineage" name="Breed_lineage" value={matingDetails.Breed_lineage} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <TextField label="User ID" name="userid" value={matingDetails.userid} onChange={handleChange} required fullWidth />
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">Add Mating</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default AddMating;