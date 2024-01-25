import { useEffect, useRef, useState } from "react";
import Time from "../time/Time";
import React from "react";

export default function Lap(props: LapProps) {
  return (
    <li className="li">
      <span>Lap {props.compLen - props.index}</span>
      <div className="lap">
        <Time time={props.lap} className="lap-li" />
      </div>
    </li>
  );
}
