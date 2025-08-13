import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubjectData,
  deleteSubjectData,
  getAllSubjectData,
  updateSubjectData,
} from "../thunk/subjectThunk";
import { toast } from "react-toastify";

function ManageSubjects() {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const { allSubjects } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getAllSubjectData());
  }, [dispatch]);

  const handleAddOrUpdate = async () => {
    if (!subject.trim()) return alert("Please enter subject name");

    try {
      if (edit) {
        const res = await dispatch(
          updateSubjectData({
            id: editId,
            values: { subject, category},
          })
        ).unwrap();
        toast.success(res.msg || "Subject updated successfully");
      } else {
        const res = await dispatch(
          addSubjectData({ subject, category})
        ).unwrap();
        toast.success(res.msg || "Subject added successfully");
      }

      dispatch(getAllSubjectData());
      setSubject("");
      setCategory("");
      setEdit(false);
      setEditId(null);
    } catch (error) {
      toast.error(error?.msg || "Something went wrong");
    }
  };

  const handleEdit = (item) => {
    setSubject(item.subject);
    setCategory(item.category || "");
    setEdit(true);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        const res = await dispatch(deleteSubjectData(id)).unwrap();
        toast.success(res.msg || "Subject deleted successfully");
        dispatch(getAllSubjectData());
      } catch (error) {
        toast.error(error?.msg || "Failed to delete subject");
      }
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
        Manage Subjects
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Subject Name"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
        />
        <TextField
          label="Category"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleAddOrUpdate}
          sx={{ minWidth: 120, backgroundColor: "lightblue", color: "black" }}
        >
          {edit ? "Update" : "Add"}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "lightblue" }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allSubjects.length > 0 ? (
              allSubjects.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.category || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No subjects found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ManageSubjects;
