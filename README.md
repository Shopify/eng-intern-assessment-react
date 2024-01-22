# Stopwatch Implementation

## Description
This project is about creating a stopwatch. It's part of the `feature/stopwatch-implementation` branch and includes the features: start, stop, reset, and lap recording. Since this is an assessment I will share extra details on my thought process for a better insight on how I think as a developer.

## Planning the Project
Before starting, I considered these key aspects:

1. File Structure
    - `src/components`: Contains UI components like `StopWatch.tsx` and `StopWatchButton.tsx`.
    - `src/hooks`: A custom hook, `useStopwatch.ts`, that has all of the stopwatch logic, for cleaner component code and reusability.
    - `src/tests`: Stores test files to ensure code reliability and maintenance.
    - `src/styles`: Stores CSS files for styling components.

2. Functionality/Design
   - The stopwatch displays time as `Minutes : Seconds : Milliseconds` (e.g., `00 : 00 : 00`).
   - Four buttons are provided: `Start`, `Stop`, `Reset`, and `Lap`. The `Stop` button appears only after the `Start` button has been pressed.
   - The design is modern with a playful, cartoonish aesthetic.

3. Edge Cases
    Due to time constraints and the nature of this project as an assessment, I've prioritized addressing the most significant edge cases:
   - To manage the display when minutes exceed `99`, an additional column for `hours` will appear. This column won't be visible initially, as hours are not commonly needed in a typical stopwatch usage scenario.
   - To ensure a clean design when the `Lap` button is used repeatedly, laps will be displayed within a fixed-size box. This box will allow users to scroll through their lap times without hiding the stopwatch or buttons, maintaining the visibility of essential controls and information at all times.
   - The stopwatch layout is designed to be responsive on all screen sizes, ensuring a consistent user experience.





