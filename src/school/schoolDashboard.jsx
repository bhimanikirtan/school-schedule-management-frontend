import { Box, Grid, Paper, Typography, Button, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachersData } from "../thunk/schoolThunk";

function SchoolDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allTeachers } = useSelector((state) => state.school);
  useEffect(() => {
    dispatch(getAllTeachersData());
  }, [dispatch]);
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        🎓 School Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6">Total Teachers</Typography>
            <Typography variant="h4">{allTeachers?.length}</Typography>
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
