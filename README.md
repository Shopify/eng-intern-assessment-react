# Stopwatch Implementation

## Demo with Commentary Walkthrough + Code Overview:
[Watch Here](https://drive.google.com/file/d/1QrMX5eecZ8R7mHkG0-W_fUeRfP1lNXn3/view?usp=sharing)

## Description
The `feature/stopwatch-implementation` branch introduces a stopwatch with start, stop, reset, and lap functions. As an assessment, I'm sharing extra details on my thought process to provide insight into my approach as a developer.

## Planning the Project
Before starting, I carefully planned key aspects of the project to ensure a clear structure and an intuitive user experience.

### 1. File Structure
- `src/components`: Contains UI components such as `StopWatch.tsx`, `StopWatchButton.tsx`, and `DynamicBackground.tsx`.
- `src/hooks`: Custom hooks including `useStopwatch.ts` for stopwatch logic and `usePerformanceCheck.ts` for performance monitoring for 3D Model.
- `src/styles`: Holds CSS files like `App.css`, `StopWatch.css`, `StopWatchButton.css`, and `DynamicBackground.css`, as well as assets such as `clock.ttf`.
- `src/tests`: Stores test files `useStopwatch.test.tsx` to ensure functionality and reliability.


### 2. Functionality/Design
The focus in designing the stopwatch interface was on simplicity and intuitive interaction:

- **Time Display Format**: Time is displayed as `Minutes : Seconds : Milliseconds` (e.g., `00 : 00 : 00`), prioritizing ease of reading.
- **3D Model of Clock**: A 3D clock showing the current time has been added to the stopwatch for a visually appealing experience.
- **Interactive background**: The background includes a color-changing blurry shape that responds to the stopwatch's actions, making it interactive and vibrant.
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
    - Calculated time based on the difference from the start, bypassing `setInterval` throttling, and ensuring UI consistency.

2. **Resolving Display Flashing Issues**:
    - Refined state updates and implemented conditional rendering for important time changes only.

3. **Optimizing Dynamic Backgrounds**:
    - Achieved smooth transitions using CSS animations and `useEffect` for performance.

4. **3D Model Performance Optimization**:
    - Reduced model details and introduced `usePerformanceCheck.ts` to disable rendering under low frame rates.

## Future Improvements
- **Enhanced 3D Model Detail**: Upgrade the 3D clock model with more details and animations for a richer visual experience.
- **Background Customization**: Introduce options for users to customize the interactive background, including shape and color changes.
- **Stopwatch Themes**: Implement theme support to allow users to personalize the stopwatch with different colors and fonts.
- **Multi-Timer Support**: Add functionality to run multiple stopwatches simultaneously, each with independent controls.
- **Export Lap Times**: Provide an option to export lap times to a file or cloud service for record-keeping and analysis.
- **Accessibility Features**: Improve the app's accessibility with voice commands and larger display options for users with visual impairments.
- **Performance Metrics**: Include detailed performance metrics for the 3D model and background to inform users about the app’s efficiency.
- **Social Sharing**: Allow users to share their lap times or time records on social media platforms directly from the app.

## How to Run Project
To get the project up and running on your local machine, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/TasfiqJ/eng-intern-assessment-react.git`

2. Change into the project directory: `cd eng-intern-assessment-react`

3. Install the required dependencies: `npm install`

4. Once the installation is complete, you can start the project: `npm` start This will launch the project in your default web browser.