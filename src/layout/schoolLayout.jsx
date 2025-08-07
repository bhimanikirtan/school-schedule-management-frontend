import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

function SchoolLayout() {
  const handleLogout = () => {
    toast.success("Logout Successfully");
    localStorage.removeItem("token");
    window.location.href = "/Login";
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          background: "#43cea2",
          color: "#fff",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold">
            🏫 School Admin Panel
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => window.history.back()}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => window.history.forward()}
            >
              <ArrowForwardIcon />
            </IconButton>

            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                ml: 2,
                color: "white",
                borderColor: "white",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                },
              }}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          mt: 10,
          p: 3,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default SchoolLayout;
