import React from "react";
import { Box, Grid, Paper, Typography, Button, Divider } from "@mui/material";

function SchoolDashboard() {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        🎓 School Dashboard
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Teachers</Typography>
            <Typography variant="h4">25</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Today's Events</Typography>
            <Typography variant="h4">5</Typography>
          </Paper>
        </Grid>
        {/* Add more cards as needed */}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Calendar Section */}
      <Typography variant="h5" gutterBottom>
        📅 Class Schedule
      </Typography>
      <Paper sx={{ p: 2, minHeight: "300px" }}>
        {/* Placeholder for Calendar */}
        <Typography>Calendar will be shown here.</Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* Teachers Section Preview */}
      <Typography variant="h5" gutterBottom>
        👨‍🏫 Teachers Overview
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography>Teacher list table will be shown here.</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Manage Teachers
        </Button>
      </Paper>
    </Box>
  );
}

export default SchoolDashboard;
