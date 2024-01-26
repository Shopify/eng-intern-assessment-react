import React from "react";
import { useEffect, useRef, useState } from "react";
import Time from "../time/Time";

import classes from "./Lap.module.css";

export default function Lap(props: LapProps) {
  const delayRef = useRef(props.delay);
  const [startReset, setStartReset] = useState(false);
  const onInitialDisplayRef = useRef(true);

  useEffect(() => {
    const stretchTimer = setTimeout(() => {
      onInitialDisplayRef.current = false;
    }, 250);

    return () => clearTimeout(stretchTimer);
  }, []);

  useEffect(() => {
    delayRef.current = props.delay;
  }, [props.delay]);

  useEffect(() => {
    if (props.className !== "idle") {
      const timer = setTimeout(() => {
        setStartReset(true);
      }, delayRef.current);

      return () => clearTimeout(timer);
    }
  }, [props.className]);

  return (
    <div
      key={props.index}
      className={`${classes["li-child"]}  ${
        onInitialDisplayRef && classes.stretching
      } ${startReset === true ? classes[`${props.className}`] : ""}`}
    >
      <span className={classes.span}>Lap {props.index + 1}</span>
      <div className={classes.lap}>
        <Time time={props.lap} className="lap-li" />
      </div>
    </div>
  );
}
