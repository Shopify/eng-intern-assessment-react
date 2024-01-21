import Typography from "@mui/material/Typography";
import React from "react";
import formatTime from "./util";

interface StopWatchProps {
  time_value: number;
}

export default function StopWatch({ time_value }: StopWatchProps) {
  const format_time = formatTime(time_value);
  return (
    <Typography variant="h1" gutterBottom>
      {format_time[0]}: {format_time[1]}: {format_time[2]}
    </Typography>
  );
}
