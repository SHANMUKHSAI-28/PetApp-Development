import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Grid,
    Paper,
    Button,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [crossings, setCrossings] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsResponse = await axios.get("http://localhost:5000/api/products");
                setProducts(productsResponse.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const fetchCrossings = async () => {
            try {
                const crossingsResponse = await axios.get("http://localhost:5000/api/crossing");
                setCrossings(crossingsResponse.data);
            } catch (error) {
                console.error("Error fetching crossings:", error);
            }
        };

        fetchProducts();
        fetchCrossings();
    }, []);

    return (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "30px", borderRadius: "15px" }}>
                <Typography variant="h4" align="center" gutterBottom style={{ color: "#3f51b5" }}>
                    Welcome to Our Pet Community!
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" paragraph>
                    Find everything you need for your beloved pets.
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    {/* Feature 1: Available Pets */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Available Pets
                        </Typography>
                        <Grid container spacing={2}>
                            {products.slice(0, 3).map((product) => ( // Display first 3 pets
                                <Grid item key={product._id} xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%" }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={product.imageurl}
                                            alt={product.Breed_name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {product.Breed_name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {product.description}
                                            </Typography>
                                            <Button component={Link} to={`/products/${product._id}`} size="small" color="primary">
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Feature 2: Pets for Mating */}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Pets for Mating
                        </Typography>
                        <Grid container spacing={2}>
                            {crossings.slice(0, 3).map((crossing) => ( // Display first 3 crossings
                                <Grid item key={crossing._id} xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%" }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={crossing.imageurl}
                                            alt={crossing.Breed_name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {crossing.Breed_name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {crossing.description}
                                            </Typography>
                                            <Button component={Link} to={`/crossings/${crossing._id}`} size="small" color="primary">
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                  {/* Feature 3: Veterinary Services */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://source.unsplash.com/random?veterinarian"
                        alt="Veterinary Services"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          <LocalHospitalIcon style={{ marginRight: "5px", verticalAlign: "middle" }} /> Veterinary Services
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Connect with trusted local veterinarians for your pet's health needs.
                        </Typography>
                        <Button component={Link} to="/veterinarians" size="small" color="primary">
                          Find Vets
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature 4: Mating Services */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://source.unsplash.com/random?animalmating"
                        alt="Mating Services"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          <FavoriteIcon style={{ marginRight: "5px", verticalAlign: "middle" }} /> Mating Services
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Find a suitable partner for your pet and explore mating opportunities.
                        </Typography>
                        <Button component={Link} to="/crossings" size="small" color="primary">
                          Find a Partner
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature 5: Pet Supplies */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://source.unsplash.com/random?petsupplies"
                        alt="Pet Supplies"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          <ShoppingCartIcon style={{ marginRight: "5px", verticalAlign: "middle" }} /> Pet Supplies
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Shop for high-quality food, toys, and accessories for your furry friend.
                        </Typography>
                        <Button component={Link} to="/supplies" size="small" color="primary">
                          Shop Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Feature 6: Delivery Services */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image="https://source.unsplash.com/random?deliveryservices"
                        alt="Delivery Services"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          <DirectionsCarIcon style={{ marginRight: "5px", verticalAlign: "middle" }} /> Delivery Services
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Get your pet supplies and other essentials delivered right to your door.
                        </Typography>
                        <Button component={Link} to="/delivery" size="small" color="primary">
                          Order Delivery
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Home;