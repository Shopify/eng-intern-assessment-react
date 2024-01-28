import React, { useState, useRef } from "react";

interface LapTableProps {
  lap: string[][];
  setLap: React.Dispatch<React.SetStateAction<string[][]>>;
}

export default function StopWatchButton({ lap, setLap }: LapTableProps) {
  const timer = useRef(null);
  const [started, setStarted] = useState(false);

  function stopOrResetStopWatch(reset: boolean) {
    /*
      Stop the stopwatch by clearing the interval that is updating the stopwatch.
      If reset is true, reset the stopwatch to 00:00:00:00.

      Parameters:
        reset (boolean): Whether to reset the stopwatch to 00:00:00:00.

      Returns:
        None
    */

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
    /*
      Start the stopwatch by updating the current time and then displaying this.
      If the stopwatch has already started, return.

      Parameters:
        None

      Returns:
        None
    */

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
    /*
      Update the lap table by adding a new row to the table.

      Parameters:
        None

      Returns:
        None
    */

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
      ].map(String),
    ]);
  }

  return (
    <>
      <div className="row justify-content-center text-center mt-3">
        <div className="col-3 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-dark reset"
            onClick={() => {
              stopOrResetStopWatch(true);
              setStarted(false);
            }}
          >
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
        <div className="col-3 d-flex justify-content-center">
          {!started && (
            <button
              type="button"
              className="btn btn-dark start"
              onClick={() => {
                startStopWatch();
                setStarted(true);
              }}
            >
              Start
            </button>
          )}

          {started && (
            <button
              type="button"
              className="btn btn-dark stop"
              onClick={() => {
                stopOrResetStopWatch(false);
                setStarted(false);
              }}
            >
              Stop
            </button>
          )}
        </div>
        <div className="col-3 d-flex justify-content-center">
          <button type="button" className="btn btn-dark" onClick={lapUpdate}>
            Lap
          </button>
        </div>
      </div>
    </>
  );
}
