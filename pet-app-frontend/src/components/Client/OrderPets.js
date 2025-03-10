// src/components/Client/OrderPets.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Link
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const OrderPets = () => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(AuthContext); // Access the token from AuthContext

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products", {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in header
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [token]);

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Order Pets
            </Typography>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.imageurl}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Link href={`/products/${product._id}`}>View Details</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default OrderPets;