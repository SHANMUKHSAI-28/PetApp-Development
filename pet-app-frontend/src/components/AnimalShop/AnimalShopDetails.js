import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Grid, Paper, Avatar } from "@mui/material";

const AnimalShopDetails = () => {
  const [animalShop, setAnimalShop] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAnimalShop = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/animalshops/${id}`);
        setAnimalShop(response.data);
      } catch (error) {
        console.error("Error fetching animal shop:", error);
      }
    };

    fetchAnimalShop();
  }, [id]);

  if (!animalShop) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <Avatar alt={animalShop.title} src={animalShop.imageUrl} sx={{ width: 150, height: 150, margin: "0 auto" }} />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              {animalShop.title}
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Details</Typography>
            <Typography variant="body1">Description: {animalShop.description}</Typography>
            <Typography variant="body1">Address: {animalShop.address}</Typography>
            <Typography variant="body1">Contact: {animalShop.contactNumber}</Typography>
            {/* Add more details here */}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AnimalShopDetails;