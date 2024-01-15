import React from "react";
import { formatNum, getCurrentTime } from "../utils/utils";

export default function DisplayTime({ timer }: { timer: number }) {
  const time = getCurrentTime(timer);

  return (
    <p style={{ fontSize: "50px" }} data-testid="timer">
      {formatNum(time.hours)}:{formatNum(time.minutes)}:
      {formatNum(time.seconds)}
    </p>
  );
}
