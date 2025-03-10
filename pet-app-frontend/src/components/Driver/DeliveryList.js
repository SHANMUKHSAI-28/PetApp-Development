// src/components/Driver/DeliveryList.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const DeliveryList = () => {
    const [deliveries, setDeliveries] = useState([]);
    const { token } = useContext(AuthContext); // Access the token from AuthContext

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/deliveries", {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in header
                    }
                });
                setDeliveries(response.data);
            } catch (error) {
                console.error("Error fetching deliveries:", error);
            }
        };

        fetchDeliveries();
    }, [token]);

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Paper elevation={3} style={{ padding: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Delivery List
                </Typography>
                <List>
                    {deliveries.map((delivery) => (
                        <ListItem key={delivery._id}>
                            <ListItemText
                                primary={`Delivery to ${delivery.customerName}`}
                                secondary={`Address: ${delivery.address}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default DeliveryList;