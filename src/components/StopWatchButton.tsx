import React from "react";

export default function StopWatchButton(props: any) {
  return (
    <div>
      {props.status === 0 ? (
        <div>
          <button className="stopwatch-btn " disabled>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={props.start}>
            Start
          </button>
        </div>
      ) : (
        ""
      )}
      {props.status === 1 ? (
        <div>
          <button className="stopwatch-btn " onClick={props.recordLap}>
            Lap
          </button>{" "}
          <button className="stopwatch-btn " onClick={props.stop}>
            Stop
          </button>
        </div>
      ) : (
        ""
      )}
      {props.status === 2 ? (
        <div>
          <button
            className="stopwatch-btn onClick={props.resume}"
            onClick={props.reset}
          >
            Reset
          </button>{" "}
          <button className="stopwatch-btn " onClick={props.resume}>
            Start
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
