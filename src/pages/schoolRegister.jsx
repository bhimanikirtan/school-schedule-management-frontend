import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
// import { registerUser } from "../redux/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { schoolRegisterData } from "../thunk/userThunk";

export default function SchoolRegister() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name must not exceed 50 characters"),

    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required")
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/, "Invalid email address"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("helooooooooooooooooooo");

      setLoading(true);
      try {
        await dispatch(schoolRegisterData(values)).unwrap();
        navigate("/schoolLogin");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Typography variant="h3">SHOP.CO</Typography> */}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: {
                    xs: "90%",
                    sm: "60%",
                    md: "50%",
                    lg: "40%",
                    xl: "30%",
                  },
                  border: "2px solid black",
                  borderRadius: 3,
                  p: isMobile ? 2 : isTab ? 2 : 4,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant={isMobile ? "h5" : "h4"}>
                    Register
                  </Typography>

                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={isMobile ? 1 : 2}>
                      <Box
                        sx={{
                          width: "100%",
                          mt: 3,
                        }}
                      >
                        <TextField
                          fullWidth
                          name="name"
                          label="Name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          error={formik.touched.name && formik.errors.name}
                          helperText={formik.touched.name && formik.errors.name}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          name="email"
                          label="Email Address"
                          type="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          error={formik.touched.email && formik.errors.email}
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          fullWidth
                          name="password"
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.password && formik.errors.password
                          }
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      {/* <Box
                        sx={{
                          width: "100%",
                        }}
                      >
                        <TextField
                          name="confirmPassword"
                          type={showconfirmPassword ? "text" : "password"}
                          fullWidth
                          label="Confirm Password"
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                          }
                          helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowconfirmPassword(!showconfirmPassword)
                                  }
                                  edge="end"
                                >
                                  {showconfirmPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box> */}
                      {/* <Box sx={{ width: "100%" }}>
                        <TextField
                          select
                          fullWidth
                          name="role"
                          label="Select Role"
                          value={formik.values.role}
                          onChange={formik.handleChange}
                          error={
                            formik.touched.role && Boolean(formik.errors.role)
                          }
                          helperText={formik.touched.role && formik.errors.role}
                          SelectProps={{
                            native: true,
                          }}
                        >
                          <option value="user">User</option>
                          <option value="vendor">Vendor</option>
                          <option value="admin">Admin</option>
                        </TextField>
                      </Box> */}

                      <Button
                        className="black"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2, py: 1.5 }}
                      >
                        {loading ? "Registering..." : "Register"}
                      </Button>
                    </Grid>
                  </form>
                  {loading && <CircularProgress size={24} />}

                  <Box>
                    <Typography textAlign="center" variant="body1">
                      Already have an account?{" "}
                      <Link
                        component={RouterLink}
                        to="/schoolLogin"
                        underline="hover"
                        fontWeight="bold"
                        sx={{}}
                      >
                        Login
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
