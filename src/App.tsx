// import "@fontsource/jetbrains-mono/600.css"; // Specify weight
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";

import Laps from "./Laps";
import React from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import { StopwatchProvider } from "./Context";

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          font-family: JetBrains Mono;
        }
      `}
    />
  );
};

export default function App() {
  return (
    <ChakraProvider>
      <StopwatchProvider>
        <GlobalStyle />
        <Box
          height="100vh"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          display="flex"
          backgroundColor="#424769"
        >
          <Box
            p="40px"
            borderRadius="24px"
            backgroundColor="#7077A1"
            width="700px"
          >
            <StopWatch />
            <StopWatchButton />
          </Box>
          <Laps />
        </Box>
      </StopwatchProvider>
    </ChakraProvider>
  );
}
