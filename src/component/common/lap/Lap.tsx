import React from "react";
import Time from "../time/Time";

import classes from "./Lap.module.css";

export default function Lap(props: LapProps) {
  return (
    <>
      <span className={classes.span}>Lap {props.compLen - props.index}</span>
      <div className={classes.lap}>
        <Time time={props.lap} className="lap-li" />
      </div>
    </>
  );
}
