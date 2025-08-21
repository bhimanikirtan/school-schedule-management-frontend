import React from "react";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  Divider,
  Typography,
  CardContent,
  Popper,
  Checkbox,
} from "@mui/material";
function Popup({ selectedEvent, isTeacher }) {
  return (
    <>
      {selectedEvent && (
        <Popper
          open={Boolean(selectedEvent)}
          anchorEl={selectedEvent.anchorEl}
          placement="right-start"
          style={{ zIndex: 1000 }}
        >
          <Card
            sx={{
              width: 280,
              borderRadius: 2,
              boxShadow: 4,
              backgroundColor: "#F4EEE5",
              pointerEvents: "none",
            }}
          >
            {isTeacher ? (
              <CardContent sx={{ p: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Title
                </Typography>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  {selectedEvent.title}
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <Checkbox
                    checked={true}
                    disabled
                    size="small"
                    sx={{
                      "&.Mui-checked": { color: "#d16f98ff" },
                      padding: 0,
                      mr: 1,
                    }}
                  />
                  <Typography variant="body1" fontWeight="medium">
                    Selected
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" alignItems="center" gap={4} mb={1}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Start Time
                    </Typography>
                    <Typography variant="body1">
                      {new Date(selectedEvent.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      End Time
                    </Typography>
                    <Typography variant="body1">
                      {new Date(selectedEvent.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />
                <Box display="flex" alignItems="center" gap={4}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Class
                    </Typography>
                    <Typography variant="body1">
                      {selectedEvent.className}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Subject
                    </Typography>
                    <Typography variant="body1">
                      {selectedEvent.subject}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            ) : (
              <>
                <CardHeader
                  avatar={
                    <Avatar
                      src={
                        selectedEvent.image
                          ? `http://192.168.146.1:5000/${selectedEvent.image}`
                          : "/placeholder.png"
                      }
                      alt={selectedEvent.teacherName || "Teacher"}
                    />
                  }
                  title={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {selectedEvent.teacherName || "—"}
                    </Typography>
                  }
                  sx={{ pb: 0 }}
                />

                <Box display="flex" alignItems="center" px={2} py={1}>
                  <Typography
                    variant="body2"
                    color="success.main"
                    sx={{ fontSize: 14 }}
                  >
                    ✔ Matched on{" "}
                    {new Date(selectedEvent.start).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                    })}
                  </Typography>
                </Box>

                <Divider />

                <CardContent sx={{ pt: 1, pb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 12, mb: 0.5 }}
                  >
                    Subject
                  </Typography>
                  <Typography variant="body1" fontWeight="medium" mb={1}>
                    {selectedEvent.subject || "—"}
                  </Typography>

                  <Box display="flex" gap={2} mb={1}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Start Time
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedEvent.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        End Time
                      </Typography>
                      <Typography variant="body1">
                        {new Date(selectedEvent.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" gap={5}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Class
                      </Typography>
                      <Typography variant="body1">
                        {selectedEvent.className || "—"}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Title
                      </Typography>
                      <Typography variant="body1">
                        {selectedEvent.title || "—"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </>
            )}
          </Card>
        </Popper>
      )}
    </>
  );
}

export default Popup;
