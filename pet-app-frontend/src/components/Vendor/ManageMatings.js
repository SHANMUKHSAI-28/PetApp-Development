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

const ManageMatings = () => {
    const [matings, setMatings] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchMatings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/matings"); // Changed endpoint
                setMatings(response.data);
            } catch (error) {
                console.error("Error fetching matings:", error);
            }
        };

        fetchMatings();
    }, []);

    return (
        <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <Typography variant="h4" gutterBottom>Manage Matings</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="matings table">
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
                        {matings.map((mating) => (
                            <TableRow key={mating._id}>
                                <TableCell>{mating.Category}</TableCell>
                                <TableCell>{mating.Breed_name}</TableCell>
                                <TableCell>{mating.Gender}</TableCell>
                                <TableCell>{mating.status}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/mating/edit/${mating._id}`} // Adjust route if needed
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

export default ManageMatings;