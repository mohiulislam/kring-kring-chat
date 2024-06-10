import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00c278",
      dark: "#00b175",
      contrastText: "#333538",
    },
    secondary: {
      main: "#4780b3",
    },
    text: {
      primary: "#fff",
      secondary: "#c9c9c9",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          backgroundColor: "#333538",
        },
      },
    },
  },
});
