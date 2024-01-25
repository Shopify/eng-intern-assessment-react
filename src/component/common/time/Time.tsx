import React from "react";

/**
 * This compoenent holds the time value to render to user
 *
 * @param props Represents the Time value to render
 * @returns compoenent to display stopwatch
 */
export default function Time(props: TimeProps) {
  return (
    <div title="time-holder" className={"time-container"}>
      <span className={`hour ${props.className}`}>
        {("0" + props.time.hour).slice(-2)}:
      </span>
      <span className={`minute ${props.className}`}>
        {("0" + props.time.minute).slice(-2)}:
      </span>
      <span className={`second ${props.className}`}>
        {("0" + props.time.second).slice(-2)}:
      </span>
      <span className={`milli ${props.className}`}>
        {("0" + ((props.time.milli / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}
