
# StopWatch Project Overview

## Introduction
The StopWatch project is a React and TypeScript-based application designed to function as a stopwatch. It provides basic stopwatch functionalities such as start, stop, lap recording, and reset. T

## Features

The stopwatch offers the following features:
- **Start/Stop**: Begin counting time or pause the timer.
- **Lap**: Record the current time without stopping the timer.
- **Reset**: Reset the stopwatch time to zero.
- **Display Laps**: Show recorded laps on the screen.

## Timer Behavior

- **Initial State**: The stopwatch initially displays the Start and Reset buttons.
- **Starting the Timer**: Pressing Start changes the button to Stop, and the Reset button changes to Lap.
- **Recording Laps**: While the timer is running, pressing the Lap button records the current time and displays it.
- **Stopping the Timer**: Pressing Stop pauses the timer, and the Lap button reverts to Reset.
- **Resuming or Resetting**: Pressing Start again resumes the timer. Pressing Reset clears the current time and recorded laps.

## Setup Instructions

1. **Install Dependencies**:
   Run `npm install` to install the necessary React dependencies and Jest for unit testing.

2. **Start the Application**:
   Execute `npm start` to run the application in development mode. Access it at [http://localhost:3000](http://localhost:3000).

3. **Run Tests**:
   Use `npm test` to execute unit tests and verify the application's functionality aligns with the expected behaviors.

## Demo

A demonstration of the StopWatch project can be found [here](https://github.com/vyhoangquocnguyen/eng-intern-assessment-react/assets/36269757/181a452d-1738-4f4f-a305-a464c4d39745).

## Contributing

Contributions to the StopWatch project are welcome! If you have suggestions for improvement or have identified issues, please feel free to contribute. Follow the standard fork-branch-PR workflow:
1. **Fork** the repository.
2. **Create a Branch** for your feature or bug fix.
3. **Commit** your changes with clear and concise messages.
4. **Push** your branch and open a **Pull Request**.

