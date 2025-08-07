import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { teacherRegisterData } from "../thunk/userThunk";

function TeacherRegister() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        teacherRegisterData({ ...formData, token })
      ).unwrap();

      setMessage(res.msg || "Registration successful");
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/teacherLogin");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError(error.msg || "Registration failed");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        👩‍🏫 Teacher Registration
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
}

export default TeacherRegister;
