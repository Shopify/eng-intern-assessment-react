import React from "react";

import { IconButton } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { MdOutlineTimer } from "react-icons/md";
import { FaStop } from "react-icons/fa6";

import StopWatchButtonProps from "../interfaces/StopWatchButtonProps";
import ButtonType from "../enums/ButtonType";

export default function StopWatchButton({
  type,
  onClick,
  isRunning
}: StopWatchButtonProps): JSX.Element {
  // Variables for button styling
  let colorScheme;
  let icon;
  let fontSize;
  let buttonSize;
  let variant;
  let testid;

  // Logic for determining button styling based on type
  switch (type) {
    case ButtonType.RESET:
      colorScheme = "white";
      icon = <GrPowerReset />;
      fontSize = "1.8rem";
      variant = "outline";
      buttonSize = "60px";
      testid = "reset-button";
      break;
    case ButtonType.START:
      colorScheme = "blue";
      icon = isRunning ? <FaStop /> : <FaPlay />;
      fontSize = "2rem";
      variant = "solid";
      buttonSize = "90px";
      testid = "start-button";
      break;
    case ButtonType.LAP:
      colorScheme = "white";
      icon = <MdOutlineTimer />;
      fontSize = "1.8rem";
      variant = "outline";
      buttonSize = "60px";
      testid = "lap-button";
      break;
    default:
      colorScheme = "gray";
  }

  // Render the button
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
      data-testid={testid}
    />
  );
}
