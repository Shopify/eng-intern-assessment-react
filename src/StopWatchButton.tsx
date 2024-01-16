import { Button } from "@chakra-ui/react";
import React from "react";

import StopWatchButtonInterface from "./interfaces/StopWatchButtonInterface";
import ButtonType from "./enums/ButtonType";

export default function StopWatchButton({ type }: StopWatchButtonInterface) {
  let colorScheme;

  switch (type) {
    case ButtonType.Reset:
      colorScheme = "pink";
      break;
    case ButtonType.Start:
      colorScheme = "green";
      break;
    case ButtonType.Lap:
      colorScheme = "purple";
      break;
    default:
      colorScheme = "gray"; // Default color scheme
  }

  return (
    <Button
      colorScheme={colorScheme}
      variant='outline'
      borderRadius={16}
      padding={5}
      size='lg'
    >
      {type}
    </Button>
  );
}
