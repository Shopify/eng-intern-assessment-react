import React from "react";
import { formatNum, getCurrentTime } from "../utils/utils";

export default function DisplayTime({ timer }: { timer: number }) {
  const time = getCurrentTime(timer);

  return (
    <div style={{ fontSize: "50px" }}>
      {formatNum(time.hours)}:{formatNum(time.minutes)}:
      {formatNum(time.seconds)}:{("00" + time.milliseconds).slice(-3)}
    </div>
  );
}
