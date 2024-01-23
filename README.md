# Stopwatch App

## Overview
This Stopwatch App is a sophisticated time-tracking tool developed using React. It showcases the ability to start, stop, and reset a timer, as well as record lap times. The project is a demonstration of React's capabilities, including state management, component structuring, and effect hooks.

## Features
- Start/Stop functionality: Toggle the running state of the stopwatch.
- Lap Recording: Record the current lap time while the stopwatch is running.
- Reset: Clears both the elapsed time and recorded laps.
- Time Display: Shows the elapsed time in a human-readable format (hh:mm:ss).

## How It's Built
The app is structured into several components:

1. **StopWatch.tsx**: The main component that handles the stopwatch logic and UI.
2. **StopWatchButton.tsx**: A sub-component for rendering the control buttons.
3. **App.tsx**: The root component that renders the Stopwatch component.
4. **index.tsx**: The entry point of the React application.

The app uses `useState` for managing the timer, laps, and running state, and `useEffect` for the timer's interval logic.

## Testing
Comprehensive tests are written using React Testing Library and Jest. The tests cover various functionalities like start/stop, lap recording, and resetting.

### Test Results
![Test Results](./test_results/test.png)

## User Interface
Here's how the Stopwatch App looks:

![Stopwatch Interface](./images/stopwatchInterface.png)

## Demo Video
Check out this demo of the app in action:

[![Watch the video](./video_demo/thumbnail.png)](./video_demo/demo.mp4)

## Getting Started
To run this project, clone the repo and install the dependencies using `npm install`. Then, start the project with `npm start`.