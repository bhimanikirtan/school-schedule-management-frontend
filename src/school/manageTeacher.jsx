import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendEmailData } from "../thunk/userThunk";

function ManageTeacher() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      dispatch(sendEmailData(email)).unwrap();

      setMessage("Teacher invitation sent successfully!");
      setEmail(""); // clear input
    } catch (err) {
      console.error(err);
      setMessage("Failed to send invitation.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
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

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Invitation
        </Button>
      </form>

      {message && (
        <Typography sx={{ mt: 2 }} color="secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default ManageTeacher;
