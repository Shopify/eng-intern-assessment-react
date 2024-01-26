import React from "react";
import classes from "./Time.module.css";

/**
 * This compoenent holds the time value to render to user
 *
 * @param props Represents the Time value to render
 * @returns compoenent to display stopwatch
 */
export default function Time(props: TimeProps) {
  return (
    <div title="time-holder" className={classes["time-container"]}>
      <span
        role="span"
        className={`${classes.hour} ${classes[`${props.className}`]}`}
      >
        {("0" + props.time.hour).slice(-2)}:
      </span>
      <span
        role="span"
        className={`${classes.minute} ${classes[`${props.className}`]}`}
      >
        {("0" + props.time.minute).slice(-2)}:
      </span>
      <span
        role="span"
        className={`${classes.second} ${classes[`${props.className}`]}`}
      >
        {("0" + props.time.second).slice(-2)}:
      </span>
      <span
        role="span"
        className={`${classes.milli} ${classes[`${props.className}`]}`}
      >
        {("0" + ((props.time.milli / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
}
