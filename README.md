# Shopify Stopwatch Application

## Description

This browser application features a functional stopwatch with start, stop, lap, and reset capabilities. It displays elapsed time and records an array of laps.

Unlike the FizzBuzz Enterprise Edition, this component aims for simplicity
and performance, without overengineering. Similar to how you don't need a
distributed, cloud-based service to figure out if a number is divisible by
3 or 5, sometimes a stopwatch just needs to count time.

## Key Implementations

-   **App.tsx:** Integration of components.
-   **StopWatch.tsx:** Core stopwatch functionality with layout for the timer display.
-   **StopWatchButtons.tsx:** Design and functionality for control buttons.
-   **StopWatch.test.tsx:** Comprehensive testing of stopwatch features.

## Testing

-   Testing in `StopWatch.test.tsx` covering display rendering, timing accuracy, and interactive features.
-   Note: Additional dependency installation may be required for testing (`npm install --save-dev @testing-library/jest-dom`).

## Usage

To run the application, clone the repository, install dependencies, and execute `npm start`. For testing, use `npm test`.
