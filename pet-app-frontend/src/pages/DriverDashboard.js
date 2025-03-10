import React from "react";
import { Typography, Container, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const DriverDashboard = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Driver Dashboard
      </Typography>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h6" gutterBottom>
          View Deliveries
        </Typography>
        <Button component={Link} to="/driver/delivery-list" variant="contained" color="primary">
          View Deliveries
        </Button>
      </Paper>
      {/* Add more Driver features */}
    </Container>
  );
};

export default DriverDashboard;