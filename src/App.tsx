import React from "react";
import StopWatch from "./components/StopWatch";
import { Box, Container } from "@mui/material";

export default function App() {
  return (
    <Container maxWidth="sm">
      <StopWatch />
      <Box width="100%" textAlign="center" marginTop="100px">
        <img
          src="https://cdn.dribbble.com/users/621539/screenshots/3760515/60fps-dribbble.gif"
          alt="Corgi Run"
          className="img"
        />
      </Box>
    </Container>
  );
}
