# Project Overview
The goal of this project is to implement a stopwatch application using React and TypeScript. The stopwatch has the following functionality:
- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

## Project Setup
To get started with the project, follow these steps:
1. Clone the project repository to your local development environment.
2. Install the required dependencies by running npm install in the project directory.
3. Familiarize yourself with the project structure. The main files you will be working with are:
    - src/App.tsx: The main component that renders the stopwatch and handles its functionality.
    - src/Stopwatch.tsx: A separate component that represents the stopwatch display.
    - src/StopwatchButton.tsx: A separate component that represents the start, stop, and reset buttons.

## Project Features
**Primary Features**
- [x] *START* button begins stopwatch; changes to *RESUME* if timer stopped
- [x] *STOP* button to stop/pause the timer 
- [x] *RESET* button to clear timer and lap list; default format of timer follows `HH:MM:SS:MS`
- [x] *LAP* button to create a record of the current time and add to lap list for display

**Secondary Features**
- [x] Responsive Design: ensures user friendly UI regardless of user device
- [x] Reload protection: page reload only after user confirmation

## Test Info
1. Suite 1: Time Formatting
    - hour formatting
    - minute formatting
    - second formatting
    - millisecond formatting
2. Suite 2: Stopwatch Functionality
    - render initial state 
    - render empty lap list 
    - start & stop the stopwatch (including resume)
    - reset stopwatch
    - record & render lap times 

## Demo
<video src="https://youtu.be/CGq7jh7sHY0" controls="controls" style="max-width: 730px;">
</video>

## Additional Dependencies
- `@emotion/react @emotion/styled` 
- `--save-dev jest-emotion`
- `--save-dev jsdom`
- `--save-dev jest-environment-jsdom`