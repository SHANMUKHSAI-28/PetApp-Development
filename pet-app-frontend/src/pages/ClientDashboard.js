import React from "react";
import { Typography, Container, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Client Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Order Pets
            </Typography>
            <Button component={Link} to="/client/order-pets" variant="contained" color="primary">
              Order Pets
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              View Mating Details
            </Typography>
            <Button component={Link} to="/client/view-mating-details" variant="contained" color="primary">
              View Mating Details
            </Button>
          </Paper>
        </Grid>
        {/* Add more Client features */}
      </Grid>
    </Container>
  );
};

export default ClientDashboard;