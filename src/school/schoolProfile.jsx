import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateProfileData } from "../thunk/userThunk";
import { toast } from "react-toastify";

export default function SchoolProfile() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useSelector((state) => state.user);
  console.log(user, "**********************");

  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: user?.addressData?.address || "",
        city: user?.addressData?.city || "",
        pincode: user?.addressData?.pincode || "",
        state: user?.addressData?.state || "",
        country: user?.addressData?.country || "",
      });
      setImageFile(`http://192.168.146.1:5000/${user?.image}`);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("address", formData.address);
      form.append("city", formData.city);
      form.append("pincode", formData.pincode);
      form.append("state", formData.state);
      form.append("country", formData.country);
      if (imageFile instanceof File) {
        form.append("image", imageFile);
      }
      for (let [key, value] of form.entries()) {
        console.log(`${key}:`, value);
      }
      const res = await dispatch(updateProfileData(form)).unwrap();
      toast.success(res.msg);
      dispatch(fetchUserData());
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 3 }}>
        <Typography
          variant={isMobile ? "h6" : "h4"}
          fontWeight={600}
          gutterBottom
        >
          School Profile
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Manage your School information and preferences
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            src={
              imageFile
                ? typeof imageFile === "string"
                  ? imageFile
                  : URL.createObjectURL(imageFile)
                : ""
            }
            sx={{ width: 80, height: 80 }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => fileInputRef.current.click()}
          >
            Upload
          </Button>
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemoveImage}
          >
            Remove
          </Button>
        </Box>

        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Container>
  );
}
