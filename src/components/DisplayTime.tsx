import React from "react";

export default function DisplayTime({
  timer,
  startTime,
}: {
  timer: number;
  startTime: number;
}) {
  if (isNaN(startTime) || isNaN(timer)) {
    throw new Error("Invalid timer or startTime");
  }

  const totalSeconds = Math.floor((timer - startTime) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = timer - startTime - totalSeconds * 1000;

  const formatNum = (num: number) => ("0" + num).slice(-2);

  return (
    <div>
      {formatNum(hours)}:{formatNum(minutes)}:{formatNum(seconds)}:
      {("00" + milliseconds).slice(-3)}
    </div>
  );
}
