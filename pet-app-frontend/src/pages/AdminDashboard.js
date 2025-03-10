import React from "react";
import { Typography, Container, Grid, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Manage Users
            </Typography>
            <Button component={Link} to="/admin/manage-users" variant="contained" color="primary">
              Manage Users
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Add Vendor
            </Typography>
            <Button component={Link} to="/admin/add-vendor" variant="contained" color="primary">
              Add Vendor
            </Button>
          </Paper>
        </Grid>
        {/* Add more Admin features */}
      </Grid>
    </Container>
  );
};

export default AdminDashboard;