import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Paper
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const ManagePets = () => {
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

    const handleDeletePet = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in header
                }
            });
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>Manage Products (Pets)</Typography>
                <List>
                    {products.map((product) => (
                        <ListItem key={product._id}>
                            <ListItemText primary={product.Breed_name} secondary={`${product.category}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePet(product._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ManagePets;