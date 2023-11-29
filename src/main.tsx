import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { theme } from "./theme";

import { App } from "./components/app";
import { FocusProvider } from "./focus";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <FocusProvider>
        <App />
      </FocusProvider>
    </ThemeProvider>
  </React.StrictMode>
);
