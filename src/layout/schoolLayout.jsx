import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  Book as BookIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from "../thunk/userThunk";
import { toast } from "react-toastify";

const drawerWidth = 250;

const navItems = [
  { text: "Home", icon: <HomeIcon />, path: "/school/schoolDashboard" },
  { text: "Manage Teacher", icon: <BookIcon />, path: "/school/manageTeacher" },
  {
    text: "Schedule",
    icon: <CalendarMonthIcon />,
    path: "/school/manageSchedule",
  },

  { text: "Settings", icon: <SettingsIcon />, path: "/school/schoolProfile" },
  { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
];

export default function SchoolLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const drawer = (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography
        variant="h6"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          fontWeight: "bold",
          color: "#1976d2",
        }}
      >
        🎓 SchoolManagement
      </Typography>

      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "#e3f2fd",
                  color: "#1976d2",
                  "& .MuiListItemIcon-root": { color: "#1976d2" },
                },
              }}
              onClick={() => {
                if (item.text === "Logout") {
                  localStorage.removeItem("token");
                  toast.success("Logout SuccessFully");
                  navigate("/login");
                } else {
                  navigate(item.path);
                }
              }}
            >
              <ListItemIcon sx={{ color: "#546e7a" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          color: "#111827",
          borderBottom: "1px solid #e6e9eb",
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" fontWeight={500}>
              {user?.name}
            </Typography>
            <Avatar
              onClick={() => {
                navigate("/school/schoolProfile");
              }}
              alt="Saikat"
              src={`http://localhost:5000/${user?.image}`}
              sx={{ width: 36, height: 36, cursor: "pointer" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              borderRight: "1px solid #eef2f4",
              bgcolor: "#ffffff",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 10,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
