import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#fff", boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="black">
            SCHOOL SCHEDULER
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              borderRadius: 2,
              px: 3,
              fontWeight: "bold",
            }}
            onClick={handleLogin}
          >
            LOG IN
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container sx={{ mt: 10, mb: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Smart School Calendar Scheduler
        </Typography>
        <Typography variant="h6" sx={{ color: "gray", mb: 4 }}>
          Organize your classes, events, exams, and meetings – all in one place.
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#000",
            px: 4,
            py: 1,
            fontWeight: "bold",
            fontSize: 16,
            borderRadius: 1,
          }}
          onClick={handleLogin}
        >
          Get Started
        </Button>
      </Container>

      {/* Features Section */}
      <Container sx={{ mb: 10 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
          Key Features
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                📅 Easy Scheduling
              </Typography>
              <Typography variant="body2">
                Drag and drop classes or events on the calendar and manage time
                effectively.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                🔔 Reminders
              </Typography>
              <Typography variant="body2">
                Set automated reminders for exams, holidays, and assignments.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                👥 Role Management
              </Typography>
              <Typography variant="body2">
                Teachers, students, and admins have dedicated access and
                permissions.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          borderTop: "1px solid #ddd",
          color: "gray",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} School Scheduler. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}

export default Home;
