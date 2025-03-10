import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
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

const CrossingList = () => {
    const { token } = useContext(AuthContext);
    const { data: crossings, loading, error, apiCall } = useAPI("http://localhost:5000/api");
    const [crossingList, setCrossingList] = useState([]);

    useEffect(() => {
        const fetchCrossings = async () => {
            try {
                const crossingData = await apiCall("/crossing", "get", null, {
                    Authorization: `Bearer ${token}`
                });
                setCrossingList(crossingData);
            } catch (err) {
                console.error("Error fetching crossings:", err);
                // Handle the error, maybe set an error state
            }
        };

        fetchCrossings();
    }, [token, apiCall]);
    const handleDelete = async (crossingId) => {
        if (window.confirm("Are you sure you want to delete this crossing?")) {
            try {
                await apiCall(`/crossing/${crossingId}`, "delete", null, {
                    Authorization: `Bearer ${token}`
                });
                setCrossingList(crossingList.filter(crossing => crossing._id !== crossingId));
            } catch (err) {
                console.error("Error deleting crossing:", err);
                // Optionally, show an error message to the user
            }
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Crossing
            </Typography>
            <Grid container spacing={3}>
                {crossingList && crossingList.map((crossing) => (
                    <Grid item key={crossing._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia component="img" height="140" image={crossing.imageurl} alt={crossing.Breed_name} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {crossing.Breed_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {crossing.description}
                                </Typography>
                                <Link to={`/crossings/${crossing._id}`}>View Details</Link> |
                                <Link to={`/crossing/edit/${crossing._id}`}>Edit Crossing</Link>
                                <Button size="small" color="secondary" onClick={() => handleDelete(crossing._id)}>
                                    Delete
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Link to={`/crossing/create`}>Create Crossing</Link>
        </Container>
    );
};

export default CrossingList;