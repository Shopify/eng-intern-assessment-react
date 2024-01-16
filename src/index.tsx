import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
