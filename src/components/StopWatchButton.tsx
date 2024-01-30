import React from "react";

export default function StopWatchButton(props: any) {
  return (
    <>
      {/* Status 0 : only Lap(disabled) and Start buttons are rendered */}
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

      {/* Status 1 : only Lap and Stop buttons are rendered */}
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

      {/* Status 2 : only Reset and Start buttons are rendered */}
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
