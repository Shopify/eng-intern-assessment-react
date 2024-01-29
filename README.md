# Project Overview
This project implements a stopwatch application using React and TypeScript. The stopwatch has the following functionality:

    - Start the stopwatch to begin counting time.
    - Stop the stopwatch to pause the timer.
    - Displays Laps when a button is pressed.
    - Reset the stopwatch.

## Project Setup
To get started with the project, follow these steps:

The project structure is:
    - src/App.tsx: The main component that renders the whole stopwatch and handles its functionality.
    - src/Stopwatch.tsx: A separate component that represents the stopwatch time display.
    - src/StopwatchButton.tsx: A separate component that represents the start, stop, and reset buttons.
    - src/App.test.tsx: The file containing the unit tests

## Project Structure
Initial State:
    - The Complete stopwatch is rendered.
    - The Time displays zero.
    - The Start and Reset Buttons are enabled.
    - The Stop and Reset Buttons are disabled.
    - There are no Laps displayed.

Button functionality:
    - The stopwatch starts counting when the user clicks the start button. Also Start button is disabled, the Lap and Stop buttons are enabled
    - The stopwatch stops counting when the user clicks the stop button. Also Start button is enabled, the Lap and Stop buttons are disabled
    - The stopwatch goes to the initial state when the user clicks the reset button regardless of whether the stopwatch is running or not. 
    - The stopwatch records and display laps when the user clicks the lap button.

## Unit Tests
    1. Check that the initial state is rendered.
    2. Check that the Start buttons starts the time running. Check the states of buttons are correct and the time displays correctly after advancing 5 seconds
    3. Check that the Lap button records two laps after two presses.
        - the initial lap of 5 seconds.
        - a second lap after 6 more seconds
    4. Check that the stop buttons stops the stopwatch by advancing the time after pressing stop and the time does not increment. Check the buttons states are correct
    5. Check that Reset works correctly while the stopwatch is running.
         - the stopwatch time resets to zero
         - the butons states have been reset
         - the laps are removed
    6. Check that Reset works correctly while the stopwatch is stopped.
         - the stopwatch time resets to zero
         - the butons states have been reset
         - the laps are removed
 