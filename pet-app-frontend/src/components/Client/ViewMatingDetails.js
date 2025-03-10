// src/components/Client/ViewMatingDetails.js
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

const ViewMatingDetails = () => {
    const [crossings, setCrossings] = useState([]);
    const { token } = useContext(AuthContext); // Access the token from AuthContext

    useEffect(() => {
        const fetchCrossings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/crossing", {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in header
                    }
                });
                setCrossings(response.data);
            } catch (error) {
                console.error("Error fetching crossings:", error);
            }
        };

        fetchCrossings();
    }, [token]);

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>
                View Mating Details
            </Typography>
            <Grid container spacing={3}>
                {crossings.map((crossing) => (
                    <Grid item key={crossing._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={crossing.imageurl}
                                alt={crossing.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {crossing.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {crossing.description}
                                </Typography>
                                <Link href={`/crossings/${crossing._id}`}>View Details</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ViewMatingDetails;