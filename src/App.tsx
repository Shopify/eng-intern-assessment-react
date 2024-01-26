import React from 'react'
import StopWatchButton from './components/StopWatchButton'
import StopWatch from './components/StopWatch'

export default function App() {

    let timer: NodeJS.Timeout;

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
        }

        // Stop the stopwatch by clearing the interval that is updating the stopwatch.
        clearInterval(timer);
        timer = null;
    }

    function startStopWatch() {
        // If the timer has already started, return.
        if (timer) {
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
        timer = setInterval(function() {
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
            hours.innerHTML = currentHours < 10 ? "0" + currentHours : currentHours.toString();
            minutes.innerHTML = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes.toString();
            seconds.innerHTML = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds.toString();
            milliseconds.innerHTML = currentMS < 10 ? "0" + currentMS : currentMS.toString();
        }, 1);
    }

    return(
        <>
            <div><StopWatch/></div>
            <div><StopWatchButton startStopWatch={startStopWatch} stopOrResetStopWatch={stopOrResetStopWatch}></StopWatchButton></div>
        </>
    )}