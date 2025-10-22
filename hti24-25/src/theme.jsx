import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6daff9", // Change this to your primary color
    },
    secondary: {
      main: "#e3e3e3", // Change this to your secondary color
    },
    background: {
      default: "#f3f3f3",
    },
    text: {
      primary: "#222", // Dark gray text
      button: "#fffcff",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", // Custom font
    h3: {
      fontWeight: "bold",
    },
    button: {
      textTransform: "none", // Prevents all caps in buttons
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1200,
      xl: 1536
  }
  }
});

export default theme;
