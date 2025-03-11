import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ManageCrossings = () => {
    const [crossings, setCrossings] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchCrossings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/crossings"); // Changed endpoint
                setCrossings(response.data);
            } catch (error) {
                console.error("Error fetching crossings:", error);
            }
        };

        fetchCrossings();
    }, []);

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>Manage Crossings</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="crossings table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category</TableCell>
                            <TableCell>Breed Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {crossings.map((crossing) => (
                            <TableRow key={crossing._id}>
                                <TableCell>{crossing.Category}</TableCell>
                                <TableCell>{crossing.Breed_name}</TableCell>
                                <TableCell>{crossing.Gender}</TableCell>
                                <TableCell>{crossing.status}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/crossing/edit/${crossing._id}`} // Adjust route if needed
                                        variant="outlined"
                                        size="small"
                                        style={{ marginRight: "5px" }}
                                    >
                                        Edit
                                    </Button>
                                    {/* Delete button logic here */}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ManageCrossings;