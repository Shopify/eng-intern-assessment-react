import { IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";
import { FaStop } from "react-icons/fa6";
import React from "react";

import StopWatchButtonInterface from "./interfaces/StopWatchButtonInterface";
import ButtonType from "./enums/ButtonType";

export default function StopWatchButton({
  type,
  onClick,
  isRunning
}: StopWatchButtonInterface) {
  let colorScheme;
  let icon;
  let fontSize;
  let buttonSize;
  let variant;

  switch (type) {
    case ButtonType.Reset:
      colorScheme = "white";
      icon = <GrPowerReset />;
      fontSize = "1.8rem";
      variant = "outline";
      buttonSize = "60px";
      break;
    case ButtonType.Start:
      colorScheme = "blue";
      icon = isRunning ? <FaStop /> : <FaPlay />;
      fontSize = "2rem";
      variant = "solid";
      buttonSize = "90px";
      break;
    case ButtonType.Lap:
      colorScheme = "white";
      icon = <MdOutlineTimer />;
      fontSize = "1.8rem";
      variant = "outline";
      buttonSize = "60px";
      break;
    default:
      colorScheme = "gray";
  }

  return (
    <IconButton
      variant={variant}
      colorScheme={colorScheme}
      width={buttonSize}
      height={buttonSize}
      isRound={true}
      padding={5}
      fontSize={fontSize}
      aria-label={type}
      icon={icon}
      onClick={onClick}
    />
  );
}
