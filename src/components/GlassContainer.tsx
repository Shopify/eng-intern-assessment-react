import React from "react";
import { Box } from "@chakra-ui/react";

import GlassContainerProps from "../interfaces/GlassContainerProps";

// glass container component for wrapping content in a glass-like container.
function GlassContainer({ children }: GlassContainerProps): JSX.Element {
  return (
    <Box
      padding={6}
      background='rgba(255, 255, 255, 0.1)'
      border='1px solid rgba(255, 255, 255, 0.2)'
      borderRadius={30}
    >
      {children}
    </Box>
  );
}

export default GlassContainer;
