import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const CrossingCreate = () => {
    const [Category, setCategory] = useState("");
    const [Breed_name, setBreed_name] = useState("");
    const [Gender, setGender] = useState("");
    const [Quality, setQuality] = useState("");
    const [imageurl, setImageurl] = useState("");
    const [mating_video, setMating_video] = useState("");
    const [Breeder_Name, setBreeder_Name] = useState("");
    const [aadhar_Number, setAadhar_Number] = useState("");
    const [Address, setAddress] = useState("");
    const [status, setStatus] = useState("available");
    const [Contact_Number, setContact_Number] = useState("");
    const [vaccination, setVaccination] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [Breed_lineage, setBreed_lineage] = useState("");
    const [userid, setUserid] = useState("");
  const { token } = useContext(AuthContext); // Get the token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/crossing",
        {
            Category,
            Breed_name,
            Gender,
            Quality,
            imageurl,
            mating_video,
            Breeder_Name,
            aadhar_Number,
            Address,
            status,
            Contact_Number,
            vaccination,
            location,
            age,
            Breed_lineage,
            userid,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token
        }
      );
      console.log("Crossing created successfully:", response.data);
      navigate("/crossing");
    } catch (error) {
      console.error("Error creating Crossing:", error);
      // Handle errors more gracefully (display error messages, etc.)
      alert("Error creating Crossing");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create Crossing
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField label="Category" value={Category} onChange={(e) => setCategory(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Breed Name" value={Breed_name} onChange={(e) => setBreed_name(e.target.value)} required />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" id="gender" value={Gender} onChange={(e) => setGender(e.target.value)} label="Gender" required>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField label="Quality" value={Quality} onChange={(e) => setQuality(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Image URL" value={imageurl} onChange={(e) => setImageurl(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Mating Video URL" value={mating_video} onChange={(e) => setMating_video(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField label="Breeder Name" value={Breeder_Name} onChange={(e) => setBreeder_Name(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Aadhar Number" value={aadhar_Number} onChange={(e) => setAadhar_Number(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Address" value={Address} onChange={(e) => setAddress(e.target.value)} required />
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select labelId="status-label" id="status" value={status} onChange={(e) => setStatus(e.target.value)} label="Status" required>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="unavailable">Unavailable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField label="Contact Number" value={Contact_Number} onChange={(e) => setContact_Number(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Vaccination" value={vaccination} onChange={(e) => setVaccination(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Breed Lineage" value={Breed_lineage} onChange={(e) => setBreed_lineage(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="User ID" value={userid} onChange={(e) => setUserid(e.target.value)} required />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Create Crossing
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CrossingCreate;