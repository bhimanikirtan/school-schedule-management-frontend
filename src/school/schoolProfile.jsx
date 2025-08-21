import React, { useEffect, useRef, useState } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateProfileData } from "../thunk/userThunk";
import { toast } from "react-toastify";
import ProfileForm from "../commonComponents/ProfileForm";

export default function SchoolProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
    dispatch(fetchUserData());
  }, [user, dispatch]);

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
      toast.success(res?.msg);
      dispatch(fetchUserData());
    } catch (error) {
      toast.error(error?.msg || "Failed to Update Profile");
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
      <ProfileForm
        title="School Profile"
        subTitle="Manage your School information and preferences"
        imageFile={imageFile}
        fileInputRef={fileInputRef}
        onChange={handleChange}
        onClick={handleRemoveImage}
        formData={formData}
        save={handleSave}
        fileChange={handleFileChange}
      />
    </Container>
  );
}
