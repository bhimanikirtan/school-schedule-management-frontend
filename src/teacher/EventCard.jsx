import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";

const EventCard = ({ title }) => {
  return (
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
  );
};

export default EventCard;
