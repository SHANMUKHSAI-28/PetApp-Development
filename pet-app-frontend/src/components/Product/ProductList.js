import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Container,
    Button
} from "@mui/material";
import useAPI from "../../hooks/useAPI";
import { AuthContext } from "../../context/AuthContext";

const ProductList = () => {
    const { token } = useContext(AuthContext);
    const { data: products, loading, error, apiCall } = useAPI("http://localhost:5000/api");
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await apiCall("/products", "get", null, {
                    Authorization: `Bearer ${token}`
                });
                setProductList(productsData);
            } catch (err) {
                console.error("Error fetching products:", err);
                // Handle the error, maybe set an error state
            }
        };

        fetchProducts();
    }, [token, apiCall]);
    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await apiCall(`/products/${productId}`, "delete", null, {
                    Authorization: `Bearer ${token}`
                });
                setProductList(productList.filter(product => product._id !== productId));
            } catch (err) {
                console.error("Error deleting product:", err);
                // Optionally, show an error message to the user
            }
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={3}>
                {productList && productList.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" height="140" image={product.imageurl} alt={product.Breed_name} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.Breed_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Link to={`/products/${product._id}`}>View Details</Link> |
                                <Link to={`/products/edit/${product._id}`}>Edit Product</Link>
                                <Button size="small" color="secondary" onClick={() => handleDelete(product._id)}>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Link to={`/products/create`}>Create Product</Link>
        </Container>
    );
};

export default ProductList;