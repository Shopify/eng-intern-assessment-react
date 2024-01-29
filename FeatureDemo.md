# Feature/stopwatch timer

This Pull Request introduces a feature to the application - a stopwatch timer. The stopwatch includes start, stop, lap, and reset functionalities.

## Demo

[![Stopwatch-Demo](/src/assets/Thumbnail.png)](/src/assets/Stopwatch-Demo.mp4)

## Introduction

The React Stopwatch project is designed to provide a simple yet visually appealing stopwatch experience.

## File Structure

- `src/App.tsx`: The main entry point of the application, housing all the project logic.
- `src/components`: Contains UI components essential to the stopwatch functionality.
  - `StopWatch.tsx`: The main stopwatch component handling the stopwatch functionality.
  - `StopWatchButton.tsx`: Component for the stopwatch control buttons, responsible for start, stop, lap, and reset actions.
- `src/styles`: Contains the CSS styles and font assets for each file.
- `src/__tests__`: Contains unit tests to ensure the reliability and functionality of the code.
  - `App.test.tsx`: Tests for the main App component.
  - `StopWatch.test.tsx`: Tests for the StopWatch component, ensuring the stopwatch functionality works as expected.
  - `StopWatchButton.test.tsx`: Tests for the StopWatchButton component.

## Interface Design

The interface features a time display in the format of Minutes : Seconds : Milliseconds and four main buttons: Start, Stop, Reset, and Lap.

## Implemented Functionalities

- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

## Test

![Test](/src/assets/test_case.png)

## Future Improvements

- Dark/Light Mode: Plan to introduce a dark/light mode toggle.
- Customizable Alerts: Plan to implement personalized alert settings.
