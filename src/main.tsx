import { ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import queryClient from "./queryClient.ts";
import { darkTheme } from "./theme/muitheme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <App /> 
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
