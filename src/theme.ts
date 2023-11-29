import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    allVariants: {
      color: "#e0e0e0",
    },
  },
  palette: {
    text: {
      primary: "#e0e0e0",
      secondary: "#bdbdbd",
    },
    background: {
      default: "#1f242a",
    },
    primary: {
      main: "#2d343c",
      light: "#575c63",
      dark: "#1f242a",
    },
    secondary: {
      main: "#1de9b6",
      light: "#4aedc4",
      dark: "14a37f",
    },
  },
});
