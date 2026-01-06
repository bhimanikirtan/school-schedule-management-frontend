import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonComponent from "./ButtonComponent";
function ProfileForm({
  title,
  subTitle,
  imageFile,
  fileInputRef,
  fileChange,
  onChange,
  onClick,
  formData,
  save,
}) {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {subTitle}
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
            onChange={fileChange}
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
            onClick={onClick}
          >
            Remove
          </Button>
        </Box>

        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={onChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={onChange}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={onChange}
            fullWidth
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="State"
            name="state"
            value={formData.state}
            onChange={onChange}
            fullWidth
          />
          <TextField
            label="Country"
            name="country"
            value={formData.country}
            onChange={onChange}
            fullWidth
          />
        </Box>
        <ButtonComponent onClick={save} buttonText="Save Changes" />
      </Box>
    </>
  );
}

export default ProfileForm;
