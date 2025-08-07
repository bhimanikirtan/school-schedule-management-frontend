import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendEmailData } from "../thunk/userThunk";
import { toast } from "react-toastify";

function ManageTeacher() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(sendEmailData(email)).unwrap();
      toast.success(res?.msg);
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error(err?.msg);
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
    </Box>
  );
}

export default ManageTeacher;
