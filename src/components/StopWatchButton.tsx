import React from "react";

export default function StopWatchButton(props: any) {
  return (
    <>
      {props.status === 0 ? (
        <>
          {" "}
          <button className="stopwatch-btn " disabled>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={props.start}>
            Start
          </button>
        </>
      ) : (
        ""
      )}
      {props.status === 1 ? (
        <>
          <button className="stopwatch-btn alt" onClick={props.recordLap}>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={props.stop}>
            Stop
          </button>
        </>
      ) : (
        ""
      )}
      {props.status === 2 ? (
        <>
          <button className="stopwatch-btn" onClick={props.reset}>
            Reset
          </button>{" "}
          <button className="stopwatch-btn " onClick={props.resume}>
            Start
          </button>
        </>
      ) : (
        ""
      )}
    </>
  );
}
