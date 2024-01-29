import React from "react";
import { Button } from "@mui/material";
import "../styles/stopwatch.css";

const BUTTON_INFO = {
  start: {
    buttonText: "Start",
    buttonColor: "#2ed087",
  },
  stop: {
    buttonText: "Stop",
    buttonColor: "#fc413f",
  },
  reset: {
    buttonText: "Reset",
    buttonColor: "#909090",
  },
  lap: {
    buttonText: "Lap",
    buttonColor: "#909090",
  },
};

type ButtonType = "start" | "stop" | "reset" | "lap";

interface StopWatchButtonType {
  onClick: () => void;
  buttonType: ButtonType;
}

export default function StopWatchButton({
  onClick,
  buttonType,
}: StopWatchButtonType) {
  const { buttonText, buttonColor } = BUTTON_INFO[buttonType];
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disableRipple
      sx={{ borderRadius: 4, backgroundColor: buttonColor, width: "100px" }}
    >
      {buttonText}
    </Button>
  );
}
