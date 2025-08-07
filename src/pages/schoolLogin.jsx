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
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { schoolLoginData } from "../thunk/userThunk";

export default function SchoolLogin() {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTab = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = yup.object({
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
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("helooooooooooooooooooo");

      setLoading(true);
      try {
        const response = await dispatch(schoolLoginData(values)).unwrap();
        const { user, token } = response;
        localStorage.setItem("token", token);
        if (user.role === "school") {
          navigate("/schoolDashboard");
        } else if (user.role === "vendor") {
          navigate("/vendor/vendorDashboard");
        } else {
          navigate("/");
        }
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
          ></Box>
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
                    Login
                  </Typography>

                  <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={isMobile ? 1 : 2}>
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
                      <Button
                        className="black"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2, py: 1.5 }}
                      >
                        {loading ? "Login" : "Login"}
                      </Button>
                    </Grid>
                  </form>
                  {loading && <CircularProgress size={24} />}

                  <Box>
                    <Typography textAlign="center" variant="body1">
                      Dont have an account?{" "}
                      <Link
                        component={RouterLink}
                        to="/login"
                        underline="hover"
                        fontWeight="bold"
                        sx={{}}
                      >
                        Register
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
