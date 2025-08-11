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
  Avatar,
  Container,
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
    <Container>
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 5 }}>
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
      </Box>
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
                    Avatar
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Phone
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Address
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    City
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    State
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Country
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Pincode
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {allTeachers?.map((teacher, index) => (
                  <TableRow key={teacher._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Avatar
                        alt={teacher?.name}
                        src={
                          teacher?.image
                            ? `http://localhost:5000/${teacher?.image}`
                            : "/default-avatar.png"
                        }
                      />
                    </TableCell>
                    <TableCell>{teacher?.name || "N/A"}</TableCell>
                    <TableCell>{teacher?.email || "N/A"}</TableCell>
                    <TableCell>{teacher?.phone || "N/A"}</TableCell>
                    <TableCell>
                      {teacher?.addressData?.address || "N/A"}
                    </TableCell>
                    <TableCell>{teacher?.addressData?.city || "N/A"}</TableCell>
                    <TableCell>
                      {teacher?.addressData?.state || "N/A"}
                    </TableCell>
                    <TableCell>
                      {teacher?.addressData?.country || "N/A"}
                    </TableCell>
                    <TableCell>
                      {teacher?.addressData?.pincode || "N/A"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default ManageTeacher;
