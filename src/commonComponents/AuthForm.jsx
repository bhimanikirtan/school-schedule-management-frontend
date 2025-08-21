import { useState } from "react";
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
import { Link as RouterLink } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";

export default function AuthForm({
  title,
  subtitle,
  initialValues,
  validationSchema,
  onSubmit,
  buttonText,
  alternateText,
  alternateLink,
  illustration,
}) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await onSubmit(values, setLoading);
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
          src={illustration}
          alt="Illustration"
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
          {title}
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          mb={2}
        >
          {subtitle}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {"name" in initialValues && (
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
          )}

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
          <ButtonComponent
            buttonType={"submit"}
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: "50px",
              background: "linear-gradient(to right, #43cea2, #185a9d)",
            }}
            buttonText={buttonText}
            loading={loading}
          />
        </form>

        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            {alternateText}{" "}
            <Link component={RouterLink} to={alternateLink} fontWeight="bold">
              Click here
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
