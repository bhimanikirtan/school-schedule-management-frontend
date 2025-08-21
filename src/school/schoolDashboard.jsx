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
import ListingTable from "../commonComponents/ListingTable";
import ButtonComponent from "../commonComponents/ButtonComponent";

function SchoolDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allSchedule } = useSelector((state) => state.schedule);
  const { allTeachers } = useSelector((state) => state.school);
  console.log(allSchedule);

  useEffect(() => {
    dispatch(getAllTeachersData());
    dispatch(getAllScheduleData());
  }, [dispatch]);
  const teacherTableHeaders = [
    { label: "#", field: "index" },
    { label: "Teacher", field: "name" },
    { label: "Title", field: "title" },
    { label: "Start", field: "start" },
    { label: "End", field: "end" },
  ];
  const teacherTableData = allSchedule.map((s, i) => ({
    index: i + 1,
    name: s?.teacherId?.name || "Unknown",
    title: s?.title,
    start: new Date(s?.start).toLocaleString(),
    end: new Date(s?.end).toLocaleString(),
  }));

  console.log(teacherTableData);

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

      <ListingTable
        title="📅 Class Schedule"
        headers={teacherTableHeaders}
        data={teacherTableData}
      />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        👨‍🏫 Teachers Overview
      </Typography>
      <Paper sx={{ p: 2 }}>
        <ButtonComponent
          onClick={() => navigate("/school/manageTeacher")}
          buttonText="Manage Teachers"
        />
      </Paper>
    </Box>
  );
}

export default SchoolDashboard;
