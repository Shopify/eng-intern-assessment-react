# Project Documentation

## Overview
This project is a React application that implements a functional and interactive stopwatch. The application is built using React and TypeScript and demonstrates a clean, user-friendly UI. The stopwatch includes the following functionalities:

1. **Start/Stop Timer**: Users can start the timer to begin counting time and stop the timer to pause the counting.
2. **Lap Functionality**: Users can record the time at specific intervals by clicking the lap button. Each lap's time is displayed in a list.
3. **Current Lap Display**: The current lap time is displayed separately, allowing users to see the elapsed time for the ongoing lap.
4. **Reset Functionality**: Users can reset the timer and lap times to zero.

## Running the Application

1. **Installation**: After cloning the repository, navigate to the project directory and install the required dependencies:

   ```bash
   npm install
   ```

2. **Starting the Application**: To run the application in your local environment, execute:

   ```bash
   npm start
   ```

   This command starts the application and opens it in your default web browser.

3. **Running Tests**: The application comes with a suite of tests to ensure the functionality works as expected. To run the tests, use:

   ```bash
   npm run test
   ```

## Components

1. **App Component (`App.tsx`)**: The main component that serves as the entry point of the application. It renders the stopwatch and encapsulates the primary logic.

2. **Stopwatch Component (`Stopwatch.tsx`)**: This component displays the stopwatch. It includes the timer display, current lap time, and the list of recorded laps. It manages the state of the timer, current lap time, and lap records.

3. **StopwatchButton Component (`StopwatchButton.tsx`)**: This component renders the control buttons for the stopwatch including start/stop, lap, and reset. It handles user interactions and communicates with the Stopwatch component to update the state based on user actions.

## Functionality Details

1. **Start/Stop Timer**: Clicking the start button begins the timer, continuously incrementing the displayed time. Clicking the stop button pauses the timer. The start button then turns into a pause button, providing a clear visual indication of the stopwatch's state.

2. **Lap Functionality**: While the timer is running, clicking the lap button records the current time into the lap list. The current lap time resets to zero and continues from there until the next lap is recorded or the stopwatch is stopped.

3. **Lap Progress**: While the timer is running, a cyan progress bar will slowly fill. This is the pace of the average duration of previous lap times.  

4. **Current Lap Display**: The current lap time is displayed above the list of recorded laps. It shows the time elapsed since the last lap was recorded or since the stopwatch started if no laps have been recorded yet.

5. **Reset Functionality**: Clicking the reset button stops the timer if it's running, resets the main timer, current lap time, and clears the list of recorded laps.

## Testing

The application includes a comprehensive set of tests to ensure the functionality of the stopwatch. Tests cover user interactions, timer functionality, lap recording, and the reset feature. The tests are written using the React Testing Library and Jest.
