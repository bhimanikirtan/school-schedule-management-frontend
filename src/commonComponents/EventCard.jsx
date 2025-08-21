import { Avatar, Box, Checkbox, Typography } from "@mui/material";

export default function EventCard({ teacherName, image, title }) {
  const src = image ? `http://192.168.146.1:5000/${image}` : "/placeholder.png";

  return (
    <>
      {title ? (
        <Box
          sx={{
            backgroundColor: "#f7d9e4",
            borderRadius: "2px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Checkbox
              checked={true}
              disabled
              size="medium"
              sx={{
                "&.Mui-checked": {
                  color: "#d16f98ff",
                },
                padding: 0,
              }}
            />
            <Typography
              variant="body2"
              noWrap
              sx={{
                fontFamily: "Arial, sans-serif",
                color: "#000",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title || "No Title"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#7a8244",
            borderradius: "2px",
            color: "white",
            padding: "4px 6px",
            gap: 1,
            height: "100%",
            fontsize: "0.85rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              src={src}
              alt={teacherName || "Teacher"}
              sx={{ width: 28, height: 28 }}
            />
            <Typography variant="body2">{teacherName || "—"}</Typography>
          </Box>
          <Box
            sx={{
              fontSize: 20,
            }}
          >
            <span style={{ color: "white" }}>✔</span>
          </Box>
        </Box>
      )}
    </>
  );
}
