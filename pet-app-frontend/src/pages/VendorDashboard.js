import React from "react";
import { Typography, Container, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const VendorDashboard = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Vendor Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Add Pet
            </Typography>
            <Button component={Link} to="/vendor/add-pet" variant="contained" color="primary">
              Add Pet
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Manage Pets
            </Typography>
            <Button component={Link} to="/vendor/manage-pets" variant="contained" color="primary">
              Manage Pets
            </Button>
          </Paper>
        </Grid>
        {/* Add more Vendor features */}
      </Grid>
    </Container>
  );
};

export default VendorDashboard;