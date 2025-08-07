import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailData } from "../thunk/userThunk";
import { toast } from "react-toastify";
import { getAllTeachersData } from "../thunk/schoolThunk";

function ManageTeacher() {
  const dispatch = useDispatch();
  const { allTeachers } = useSelector((state) => state.school);
  console.log("allllllllll", allTeachers);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(sendEmailData(email)).unwrap();
      toast.success(res?.msg || "Invitation sent!");
      setEmail("");
    } catch (err) {
      toast.error(err?.msg || "Failed to send invitation");
    }
  };

  useEffect(() => {
    dispatch(getAllTeachersData());
  }, [dispatch]);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        📧 Send Teacher Invitation
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Teacher Email"
          variant="outlined"
          fullWidth
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth>
          Send Invitation
        </Button>
      </form>

      <Box mt={5}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          👩‍🏫 All Registered Teachers
        </Typography>

        {allTeachers?.length === 0 ? (
          <Typography>No teachers found.</Typography>
        ) : (
          <Paper elevation={2} sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#43cea2" }}>
                <TableRow>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allTeachers?.map((teacher, index) => (
                  <TableRow key={teacher._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{teacher?.name || "N/A"}</TableCell>
                    <TableCell>{teacher?.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default ManageTeacher;
