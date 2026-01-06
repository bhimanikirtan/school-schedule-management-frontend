import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
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
import ListingTable from "../commonComponents/ListingTable";
import ButtonComponent from "../commonComponents/ButtonComponent";

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
    if (!subject) {
      toast.error("Please enter subject name");
    } else {
      try {
        if (edit) {
          const res = await dispatch(
            updateSubjectData({
              id: editId,
              values: { subject, category },
            })
          ).unwrap();
          toast.success(res?.msg || "Subject updated successfully");
        } else {
          const res = await dispatch(
            addSubjectData({ subject, category })
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
    }
  };

  const handleEdit = (item) => {
    setSubject(item.subject);
    setCategory(item.category || "");
    setEdit(true);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await dispatch(deleteSubjectData(id)).unwrap();
      toast.success(res.msg || "Subject deleted successfully");
      dispatch(getAllSubjectData());
    } catch (error) {
      toast.error(error?.msg || "Failed to delete subject");
    }
  };

  const teacherTableHeaders = [
    { label: "#", field: "index" },
    { label: "Subject", field: "subject" },
    { label: "Category", field: "category" },
    { label: "Created At", field: "createdAt" },
    { label: "Actions", field: "actions" },
  ];

  const teacherTableData = allSubjects.map((s, i) => ({
    index: i + 1,
    subject: s?.subject || "Unknown",
    category: s?.category || "N/A",
    createdAt: new Date(s?.createdAt).toLocaleDateString(),
    actions: (
      <>
        <IconButton
          color="primary"
          onClick={() => {
            handleEdit(s);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            handleDelete(s?._id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ),
  }));

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

        <ButtonComponent
          buttonText={edit ? "Update" : "Add"}
          onClick={handleAddOrUpdate}
          variant="contained"
          sx={{ minWidth: 120, color: "black" }}
        />
      </Box>
      <ListingTable
        title="📅 All Subjects"
        headers={teacherTableHeaders}
        data={teacherTableData}
      />
    </Container>
  );
}

export default ManageSubjects;
