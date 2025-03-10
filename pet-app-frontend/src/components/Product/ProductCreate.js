import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const ProductCreate = () => {
  const [petsshop, setPetsshop] = useState("");
  const [userId, setUserId] = useState("");
  const [imageurl, setImageurl] = useState([]);
  const [Breed_name, setBreed_name] = useState("");
  const [quality, setQuality] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [petParentsMatingVideo, setPetParentsMatingVideo] = useState("");
  const [Breed_lineage, setBreed_lineage] = useState("");
  const [Address, setAddress] = useState("");
  const [Gender, setGender] = useState("");
  const [status, setStatus] = useState("available");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [vaccination, setVaccination] = useState("");
  const [Breeder_Name, setBreeder_Name] = useState("");
  const [Contact_Number, setContact_Number] = useState("");
  const { token } = useContext(AuthContext); // Get the token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        {
          petsshop,
          userId,
          imageurl,
          Breed_name,
          quality,
          price,
          category,
          petParentsMatingVideo,
          Breed_lineage,
          Address,
          Gender,
          status,
          location,
          age,
          vaccination,
          Breeder_Name,
          Contact_Number,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token
        }
      );
      console.log("Product created successfully:", response.data);
      navigate("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      // Handle errors more gracefully (display error messages, etc.)
      alert("Error creating product");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField label="Pet Shop ID" value={petsshop} onChange={(e) => setPetsshop(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Image URLs (comma separated)" value={imageurl} onChange={(e) => setImageurl(e.target.value.split(','))} required />
          </Grid>
          <Grid item>
            <TextField label="Breed Name" value={Breed_name} onChange={(e) => setBreed_name(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Quality" value={quality} onChange={(e) => setQuality(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Pet Parents Mating Video URL" value={petParentsMatingVideo} onChange={(e) => setPetParentsMatingVideo(e.target.value)} />
          </Grid>
          <Grid item>
            <TextField label="Breed Lineage" value={Breed_lineage} onChange={(e) => setBreed_lineage(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Address" value={Address} onChange={(e) => setAddress(e.target.value)} required />
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
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select labelId="status-label" id="status" value={status} onChange={(e) => setStatus(e.target.value)} label="Status" required>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="unavailable">Unavailable</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Vaccination" value={vaccination} onChange={(e) => setVaccination(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Breeder Name" value={Breeder_Name} onChange={(e) => setBreeder_Name(e.target.value)} required />
          </Grid>
          <Grid item>
            <TextField label="Contact Number" value={Contact_Number} onChange={(e) => setContact_Number(e.target.value)} required />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Create Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProductCreate;