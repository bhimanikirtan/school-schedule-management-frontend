import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { schoolRegisterData } from "../thunk/userThunk";
import { toast } from "react-toastify";
import registerIllustration from "../assets/loginimg.avif";

export default function SchoolRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("School name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await dispatch(schoolRegisterData(values)).unwrap();
        toast.success(res?.msg);
        navigate("/Login");
      } catch (error) {
        toast.error(error?.msg || "Registration failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Grid
      container
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={registerIllustration}
          alt="Register Illustration"
          sx={{ width: "100%", maxWidth: 550 }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          maxWidth: 530,
        }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          🏫 School Registration
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          mb={2}
        >
          Fill in the details to register your school
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            name="name"
            label="School Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            name="email"
            label="School Email"
            type="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "50px",
              background: "linear-gradient(to right, #43cea2, #185a9d)",
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register School"
            )}
          </Button>
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component={RouterLink} to="/Login" fontWeight="bold">
              Login here
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
