import { Button, CircularProgress } from "@mui/material";

function ButtonComponent({
  buttonText,
  buttonType,
  onClick,
  variant = "contained",
  sx = {},
  fullWidth,
  loading,
}) {
  return (
    <Button
      type={buttonType}
      onClick={onClick}
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        backgroundColor: "#f4eee5",
        color: "black",
        ...sx,
      }}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : buttonText}
    </Button>
  );
}

export default ButtonComponent;
