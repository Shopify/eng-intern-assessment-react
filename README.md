# Stopwatch Implementation

## Description
This project involves creating a stopwatch as part of the `feature/stopwatch-implementation` branch. It encompasses features such as start, stop, reset, and lap recording. As an assessment, I'm sharing extra details on my thought process to provide insight into my approach as a developer.

## Planning the Project
Before starting, I carefully planned key aspects of the project to ensure a clear structure and an intuitive user experience.

### 1. File Structure
- `src/components`: Contains UI components like `StopWatch.tsx` and `StopWatchButton.tsx`.
- `src/hooks`: Hosts the custom hook `useStopwatch.ts`, centralizing stopwatch logic for cleaner code and reusability.
- `src/tests`: Stores test files to ensure code reliability and ease of maintenance.
- `src/styles`: Holds CSS files for styling, contributing to a cohesive and visually appealing design.

### 2. Functionality/Design
The focus in designing the stopwatch interface was on simplicity and intuitive interaction:

- **Time Display Format**: Time is displayed as `Minutes : Seconds : Milliseconds` (e.g., `00 : 00 : 00`), prioritizing ease of reading.
- **Dynamic Button Layout**: The interface adapts to the stopwatch's state, displaying only relevant controls:
  - **Initial State (`00:00.00`)**: Shows `Start` and `Lap` buttons. `Lap` is disabled, just visable to help user. 
  - **Timer Running**: Switches `Start` to `Pause` and keeps `Lap` visible for lap recording.
  - **Timer Paused**: Displays `Resume` and `Reset`. `Resume` continues from the paused time, while `Reset` clears to `00:00.00`.

### 3. Edge Cases
Addressing significant edge cases was a priority, considering time constraints and the project's nature as an assessment:
- **Hours Column**: When minutes exceed `99`, an `hours` column appears, usually hidden in typical stopwatch use.
- **Lap Scrolling**: Repeated `Lap` use displays times in a scrollable box, maintaining essential control visibility.
- **Responsive Design**: The layout is responsive across all screen sizes for a consistent experience.
- **Continued Running**: The stopwatch runs continuously, even when the tab/window is not in focus.

## Problems I Faced
1. **Continuing the Timer in Inactive Tabs**:
    - Switched to calculating elapsed time from the difference between current time and start time.
    - Overcame browser throttling of `setInterval` in inactive tabs.
    - Added a state variable to trigger frequent re-renders for a consistently updated UI display.

2. **Resolving Display Flashing Issues**:
    - Optimized state updates for sequential execution, avoiding rendering conflicts.
    - Implemented conditional rendering to update the display only for significant time
