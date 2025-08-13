import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Box, Grid, Paper, Typography, Button, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeachersData } from "../thunk/schoolThunk";
import { getAllScheduleData } from "../thunk/scheduleThunk";

function SchoolDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allSchedule } = useSelector((state) => state.schedule);
  const { allTeachers } = useSelector((state) => state.school);
  useEffect(() => {
    dispatch(getAllTeachersData());
    dispatch(getAllScheduleData());
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
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6">Total Schedules</Typography>
            <Typography variant="h4">{allSchedule?.length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        📅 Class Schedule
      </Typography>

      <Paper sx={{ p: 2, minHeight: "200px" }}>
        {allSchedule?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>#</strong>
                </TableCell>
                <TableCell>
                  <strong>Teacher</strong>
                </TableCell>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Start</strong>
                </TableCell>
                <TableCell>
                  <strong>End</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSchedule.map((s, index) => (
                <TableRow key={s._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{s.teacherId?.name || "Unknown"}</TableCell>
                  <TableCell>{s.title}</TableCell>
                  <TableCell>{new Date(s.start).toLocaleString()}</TableCell>
                  <TableCell>{new Date(s.end).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No schedules found.</Typography>
        )}
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
