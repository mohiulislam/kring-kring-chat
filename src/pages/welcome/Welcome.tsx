import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <Box
      component={"main"}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="/src/assets/imgs/logo.svg"
          alt="Vercel Logo"
          width={100}
          height={100}
        ></img>
        <Typography variant="h5" sx={{ color: "text.primary" }}>
          Welcome to Kring-Kring
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          A simple communication app to connect with friends.
        </Typography>
        <Link to="/signin">
          <Button
            color="secondary"
            variant="contained"
            sx={{
              marginTop: 3,
              paddingX: 5,
              paddingY: 1,
            }}
          >
            Get started
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
