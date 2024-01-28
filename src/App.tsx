import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background-color: #96bf48;
        }
      `}
    />
  );
};

export default function App() {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Box
        border="3px solid red"
        height="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <StopWatch />
        <StopWatchButton />
      </Box>
    </ChakraProvider>
  );
}
