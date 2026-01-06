import React, { useEffect, useState } from "react";
import { TextField, Box, Typography, Container, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailData } from "../thunk/userThunk";
import { toast } from "react-toastify";
import { getAllTeachersData } from "../thunk/schoolThunk";
import ListingTable from "../commonComponents/ListingTable";
import ButtonComponent from "../commonComponents/ButtonComponent";

function ManageTeacher() {
  const dispatch = useDispatch();
  const { allTeachers } = useSelector((state) => state.school);
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

  const teacherTableHeaders = [
    { label: "#", field: "index" },
    { label: "Avatar", field: "avatar" },
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "Address", field: "address" },
    { label: "City", field: "city" },
    { label: "State", field: "state" },
    { label: "Country", field: "country" },
    { label: "Pincode", field: "pincode" },
  ];

  const teacherTableData = allTeachers.map((t, i) => ({
    index: i + 1,
    avatar: (
      <Avatar
        alt={t?.name}
        src={
          t?.image
            ? `http://192.168.146.1:5000/${t?.image}`
            : "/default-avatar.png"
        }
      />
    ),
    name: t?.name,
    email: t?.email,
    phone: t?.phone,
    address: t?.addressData?.address || "N/A",
    city: t?.addressData?.city || "N/A",
    state: t?.addressData?.state || "N/A",
    country: t?.addressData?.country || "N/A",
    pincode: t?.addressData?.pincode || "N/A",
  }));

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

          <ButtonComponent
            fullWidth
            buttonType="submit"
            buttonText="Send Invitation"
            variant="contained"
          />
        </form>
      </Box>

      <ListingTable
        title="👩‍🏫 All Registered Teachers"
        headers={teacherTableHeaders}
        data={teacherTableData}
      />
    </Container>
  );
}

export default ManageTeacher;
