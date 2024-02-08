# Stopwatch App

## Overview
The Stopwatch App is a testament to modern web application development, embodying functionality and sleek design. Developed using React, this project is an excellent example of effective state management, component structuring, and the utilization of React's effect hooks. It is crafted to demonstrate not only technical proficiency but also an understanding of user-centric design principles.

## Key Features
- **Start/Stop Functionality:** Seamlessly control the operation of the stopwatch with an intuitive interface.
- **Lap Recording:** Accurate and efficient tracking of lap times, reflecting a deep understanding of user needs.
- **Reset Capability:** One-click reset functionality, making the app user-friendly and efficient.
- **Readable Time Display:** Clearly displays time in a human-readable format (hh:mm:ss), prioritizing user experience.

## Technical Architecture
This Stopwatch App is a showcase of clean and modular coding practices:

1. **StopWatch.tsx:** The central component, handling both the logic and presentation of the stopwatch.
2. **StopWatchButton.tsx:** Manages the rendering of control buttons, exemplifying effective component design.
3. **App.tsx:** The root component that assembles the application, demonstrating good structuring practices.
4. **index.tsx:** The starting point of the application, integrating React with the app's components.

### State Management and Effects
- Implements `useState` for managing the stopwatch's state, demonstrating effective use of React's state management capabilities.
- Utilizes `useEffect` for interval logic, ensuring responsive and performance-efficient updates.

## Testing Strategy
The app includes a comprehensive suite of tests using React Testing Library and Jest, highlighting a commitment to quality and reliability.

### Test Implementation
- **Mock Timers:** Efficiently simulates the passage of time in tests.
- **User Interaction Simulation:** Ensures thorough testing by mimicking real user actions.
- **Functionality Verification:** Validates that the stopwatch operates correctly and meets design specifications.

### Test Results
![Test Results](./test_results/test.png)

## User Interface
The app features a simple yet elegant user interface, balancing aesthetic appeal with functionality, demonstrating a keen eye for user-centric design.

![Stopwatch Interface](./images/stopwatchInterface.png)


## Demonstration Video
Experience the app's functionality firsthand through this demonstration video:

https://github.com/EDHE08232001/InternAssessmentSolution/assets/80665238/bde18c12-814e-4319-85c6-a28ec85829c7


## Getting Started
To start exploring this project, clone the repository and install dependencies with `npm install`. Launch the app with `npm start` and experience a harmonious blend of modern technology and design.