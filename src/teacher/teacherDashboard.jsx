import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TeacherDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Welcome, Teacher!
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3}>
        {[
          { title: "Total Students", value: 120 },
          { title: "Total Classes", value: 8 },
          { title: "Today's Schedule", value: 4 },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4">{item.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Profile + Schedule */}
      <Grid container spacing={3}>
        {/* Teacher Profile */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ width: 60, height: 60 }}>T</Avatar>
                <Box>
                  <Typography variant="h6">Mr. John Doe</Typography>
                  <Typography color="textSecondary">
                    Mathematics Teacher
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2">
                Email: john.doe@example.com
              </Typography>
              <Typography variant="body2">Phone: +91-9876543210</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Schedule */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Schedule
            </Typography>
            <List>
              {[
                { time: "9:00 AM", subject: "Class 10 - Algebra" },
                { time: "11:00 AM", subject: "Class 8 - Geometry" },
                { time: "2:00 PM", subject: "Class 12 - Calculus" },
              ].map((item, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={item.subject}
                    secondary={`Time: ${item.time}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacherDashboard;
