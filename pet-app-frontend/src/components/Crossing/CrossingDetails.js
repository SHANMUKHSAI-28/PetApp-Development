import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const CrossingDetails = () => {
  const [crossing, setCrossing] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext); // Get the token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrossing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/crossing/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Include the token
        });
        setCrossing(response.data);
      } catch (error) {
        console.error("Error fetching crossing:", error);
      }
    };

    fetchCrossing();
  }, [id, token]);

  if (!crossing) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <img src={crossing.imageurl} alt={crossing.name} style={{ width: "150px", height: "150px", objectFit: "cover" }} />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              {crossing.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Details</Typography>
            <Typography variant="body1">Description: {crossing.description}</Typography>
            <Typography variant="body1">Price: {crossing.price}</Typography>
            {/* Display all crossing details here */}
            {token && ( //Conditionally render button
            <Button variant="contained" color="primary">Contact Breeder</Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CrossingDetails;