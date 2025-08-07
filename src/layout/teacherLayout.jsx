import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
} from "@mui/material";
import {
  Logout as LogoutIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const drawerWidth = 240;

function TeacherLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout SuccessFully");
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#ffffff" : "#c5cae9",
    backgroundColor: isActive ? "#185a9d" : "transparent",
    padding: "10px 20px",
    borderRadius: 8,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    transition: "0.3s",
    marginBottom: 8,
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#185a9d", zIndex: 1301 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" noWrap>
              👨‍🏫 Teacher Dashboard
            </Typography>
            <Tooltip title="Back">
              <IconButton color="inherit" onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward">
              <IconButton color="inherit" onClick={() => navigate(1)}>
                <ArrowForwardIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexGrow: 1, pt: 8 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              mt: 8,
              backgroundColor: "#0e3a66ff",
              color: "#fff",
              boxSizing: "border-box",
              paddingTop: 2,
              paddingLeft: 1,
              paddingRight: 1,
              borderRight: "none",
            },
          }}
        >
          <List>
            <ListItem
              button
              component={NavLink}
              to="/teacher/teacherDashboard"
              style={navLinkStyle}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <Divider sx={{ backgroundColor: "#7986cb", my: 2 }} />
            <ListItem
              button
              component={NavLink}
              to="/teacher/manageTeachers"
              style={navLinkStyle}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="ManageTeachers" />
            </ListItem>
            <Divider sx={{ backgroundColor: "#7986cb", my: 2 }} />

            <ListItem
              button
              component={NavLink}
              to="/teacher/sendEmail"
              style={navLinkStyle}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Send Email" />
            </ListItem>
            <Divider sx={{ backgroundColor: "#7986cb", my: 2 }} />

            <ListItem
              button
              component={NavLink}
              to="/teacher/classSchedule"
              style={navLinkStyle}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Class Schedule" />
            </ListItem>
            <Divider sx={{ backgroundColor: "#7986cb", my: 2 }} />

            <ListItem
              button
              component={NavLink}
              to="/teacher/resources"
              style={navLinkStyle}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary="Resources" />
            </ListItem>

            <Divider sx={{ backgroundColor: "#7986cb", my: 2 }} />

            <ListItem
              button
              component={NavLink}
              to="/teacher/teacherProfile"
              style={navLinkStyle}
            >
              <ListItemIcon sx={{ color: "#fff" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default TeacherLayout;
