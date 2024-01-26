import React, { useState, useRef } from "react";
import LapTable from "./LapTable";

export default function StopWatchButton() {
  const timer = useRef(null);
  const [lap, setLap] = useState([]);

  function stopOrResetStopWatch(reset: boolean) {
    // Get the elements representing the individual digits of the stopwatch.
    let hours = document.getElementById("hours");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    let milliseconds = document.getElementById("milliseconds");

    // Reset the timer.
    if (reset) {
      hours.innerHTML = "00";
      minutes.innerHTML = "00";
      seconds.innerHTML = "00";
      milliseconds.innerHTML = "00";
      setLap([]);
    }

    // Stop the stopwatch by clearing the interval that is updating the stopwatch.
    clearInterval(timer.current);
    timer.current = null;
  }

  function startStopWatch() {
    // If the timer has already started, return.
    if (timer.current != null) {
      return;
    }

    // Get the elements representing the individual digits of the stopwatch.
    let hours = document.getElementById("hours");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    let milliseconds = document.getElementById("milliseconds");

    // Initialize the current time.
    let currentHours = parseInt(hours.innerHTML);
    let currentMinutes = parseInt(minutes.innerHTML);
    let currentSeconds = parseInt(seconds.innerHTML);
    let currentMS = parseInt(milliseconds.innerHTML);

    // Start the stopwatch by updating current time and then displaying this.
    timer.current = setInterval(function () {
      // Update current time.
      currentMS++;
      if (currentMS == 100) {
        currentMS = 0;
        currentSeconds++;
      }
      if (currentSeconds == 60) {
        currentSeconds = 0;
        currentMinutes++;
      }
      if (currentMinutes == 60) {
        currentMinutes = 0;
        currentHours++;
      }
      // Display stopwatch
      hours.innerHTML =
        currentHours < 10 ? "0" + currentHours : currentHours.toString();
      minutes.innerHTML =
        currentMinutes < 10 ? "0" + currentMinutes : currentMinutes.toString();
      seconds.innerHTML =
        currentSeconds < 10 ? "0" + currentSeconds : currentSeconds.toString();
      milliseconds.innerHTML =
        currentMS < 10 ? "0" + currentMS : currentMS.toString();
    }, 1);
  }

  function lapUpdate() {
    // Get the elements representing the individual digits of the stopwatch.
    let hours = document.getElementById("hours").innerHTML;
    let minutes = document.getElementById("minutes").innerHTML;
    let seconds = document.getElementById("seconds").innerHTML;
    let milliseconds = document.getElementById("milliseconds").innerHTML;

    // Create a new row and add it to the table.
    setLap((lap) => [
      ...lap,
      [
        lap.length + 1,
        hours + ":" + minutes + ":" + seconds + ":" + milliseconds,
        "",
      ],
    ]);
  }

  return (
    <>
      <div className="row text-center mt-3">
        <div className="col-3">
          <button
            type="button"
            className="btn btn-dark"
            onClick={startStopWatch}
          >
            Start
          </button>
        </div>
        <div className="col-3">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              stopOrResetStopWatch(false);
            }}
          >
            Stop
          </button>
        </div>
        <div className="col-3">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              stopOrResetStopWatch(true);
            }}
          >
            Reset
          </button>
        </div>
        <div className="col-3">
          <button type="button" className="btn btn-dark" onClick={lapUpdate}>
            Lap
          </button>
        </div>
      </div>
      <div className="row text-center mt-3">
        <LapTable lap={lap} />
      </div>
    </>
  );
}
