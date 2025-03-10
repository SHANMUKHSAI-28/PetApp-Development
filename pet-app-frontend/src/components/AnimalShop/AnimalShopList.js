import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const AnimalShopList = () => {
  const [animalShops, setAnimalShops] = useState([]);

  useEffect(() => {
    const fetchAnimalShops = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/animalshops");
        setAnimalShops(response.data);
      } catch (error) {
        console.error("Error fetching animal shops:", error);
      }
    };
    fetchAnimalShops();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Animal Shops
      </Typography>
      <Grid container spacing={3}>
        {animalShops.map((shop) => (
          <Grid item key={shop._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="140" image={shop.imageUrl} alt={shop.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {shop.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shop.description}
                </Typography>
                <Link to={`/animalshops/${shop._id}`}>View Details</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AnimalShopList;