# Introduction
My name is Chirag Asrani, and this is my submission for the Shopify Front-end Engineering Assessment, for Summer 2024 Internships in Canada. 

# Project Overview
The project is a stopwatch application built using React, CSS, and TypeScript. The stopwatch should have the following functionality:

- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

## Project Setup
To get started with the project, follow these steps:

1. Clone the project repository to your local development environment.

2. Install the required dependencies by running npm install in the project directory.

3. Familiarize yourself with the project structure. The main files are:
    - src/App.tsx: The main component that renders the stopwatch and handles its functionality.
    - src/Stopwatch.tsx: A separate component that represents the stopwatch display.
    - src/StopwatchButton.tsx: A separate component that represents the start, stop, and reset buttons.

4. Run the project using npm start.
5. Test it yourself.

To run the test cases, follow the steps:
1. Run npx cypress open in one terminal.
2. Run the project using npm start in another terminal.
3. When cypress window opens, select E2E (end-to-end testing) and select your browser.
4. Find the spec StopwatchTest.cy.ts in cypress\e2e in specs.
5. See the test cases pass.
6. NOTE: The project URL can be updated in the spec file.

