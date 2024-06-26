import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Box sx={{ height: "100vh", backgroundColor: "background.default" }}>
      <Box>
        <Toaster position="top-center" />
      </Box>
      <Outlet />
    </Box>
  );
}
