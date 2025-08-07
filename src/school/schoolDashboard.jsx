import { Box, Grid, Paper, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SchoolDashboard() {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🎓 School Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6">Total Teachers</Typography>
            <Typography variant="h4">25</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        📅 Class Schedule
      </Typography>
      <Paper sx={{ p: 2, minHeight: "200px" }}>
        <Typography>Calendar will be shown here.</Typography>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        👨‍🏫 Teachers Overview
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography>Teacher list table will be shown here.</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/school/manageTeacher")}
        >
          Manage Teachers
        </Button>
      </Paper>
    </Box>
  );
}

export default SchoolDashboard;
