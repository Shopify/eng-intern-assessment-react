import { Box } from "@chakra-ui/react";

import React, { ReactNode } from "react";
import GlassContainerProps from "../interfaces/GlassContainerProps";

function GlassContainer({ children }: GlassContainerProps) {
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
