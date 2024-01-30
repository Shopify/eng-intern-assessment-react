# Simple Stopwatch Overview
This implementation of the stopwatch is functionally inspired by the native stopwatch found on iOS devices. It features two buttons: Start/Stop and Lap/Reset. When the stopwatch is running, "Lap" and "Stop" are displayed. When the stopwatch is stopped, "Reset" and "Start" are displayed. Laps are recorded below the timer and show the lap number as well as the time for that lap. When at least 2 laps have been recorded, the fastest and slowest laps are marked with a badge indicator.

# Setup and Run
In the project directory run, ```npm install``` to install the project's dependencies.

To run the stopwatch, enter: ```npm run start```

To run the project tests, enter: ```npm run test```

## Implementation Notes
- The project makes use of Shopify's Polaris design system for components and styling.
- The two buttons (Start/Stop, Reset/Lap) toggle between states with much of the state being handled in the parent component StopWatch.
- A Lap component was created to list current and completed laps as well as mark the fastest and slowest laps. The project could be further refactored by adding a LapList component to wrap all laps.
- There is currently no limit on the number of laps that can be recorded or the elapsed time, this should be implemented in future updates.
- Many more tests could be added for other cases not covered (multiple laps, etc.).