# Welcome to Stopify, a stopwatch for all your needs.

# Assumptions made

Since there was no requirements phase, i was unable to clarify various amount of things regarding this project. So, here's a few things i had to assume.

1. 00:00:00 could be any format, but i assumed HH:MM:SS, thus i enabled my stopwatch to count in seconds.
2. The button 'Pause' highlighted in **tests** folder and pressed 'Stop' once the timer has been running is the same.
3. Stop, Lap, Reset could not be pressed if timer isnt active.

# How it works

- Clicking Start will start the timer.
- Clicking Stop will stop the timer.
- Clicking Start after clicking Stop will Resume the timer.
- Clicking Rest at any point except when timer is at 00:00:00 will record a lap.
- Clicking Reset at any point except when timer is at 00:00:00 will reset everything.

# BELOW IS THE ORIGINAL README.md

# Technical Instructions

1. Fork this repo to your local Github account.
2. Create a new branch to complete all your work in.
3. Test your work using the provided tests
4. Create a Pull Request against the Shopify Main branch when you're done and all tests are passing

# Project Overview

The goal of this project is to implement a stopwatch application using React and TypeScript. The stopwatch should have the following functionality:

- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

You will be provided with a basic project structure that includes the necessary files and dependencies. Your task is to write the code to implement the stopwatch functionality and ensure that it works correctly.

## Project Setup

To get started with the project, follow these steps:

1. Clone the project repository to your local development environment.

2. Install the required dependencies by running npm install in the project directory.

3. Familiarize yourself with the project structure. The main files you will be working with are:

   - src/App.tsx: The main component that renders the stopwatch and handles its functionality.
   - src/Stopwatch.tsx: A separate component that represents the stopwatch display.
   - src/StopwatchButton.tsx: A separate component that represents the start, stop, and reset buttons.

4. Review the existing code in the above files to understand the initial structure and component hierarchy.

## Project Goals

Your specific goals for this project are as follows:

1. Implement the stopwatch functionality:

   - The stopwatch should start counting when the user clicks the start button.
   - The stopwatch should stop counting when the user clicks the stop button.
   - The stopwatch should reset to zero when the user clicks the reset button.
   - The stopwatch should record and display laps when user clicks the lap button.

2. Ensure code quality:

   - Write clean, well-structured, and maintainable code.
   - Follow best practices and adhere to the React and TypeScript coding conventions.
   - Pay attention to code readability, modularity, and performance.

3. Test your code:

   - Run the application and test the stopwatch functionality to ensure it works correctly.
   - Verify that the stopwatch starts, stops, resets, and records laps as expected.

4. Code documentation:

   - Document your code by adding comments and explanatory notes where necessary.
   - Provide clear explanations of the implemented functionality and any important details.

5. Version control:

   - Use Git for version control. Commit your changes regularly and push them to a branch in your forked repository.

6. Create a Pull Request:
   - Once you have completed the project goals, create a pull request to merge your changes into the main repository.
   - Provide a clear description of the changes made and any relevant information for the code review.

## Getting Started

To start working on the project, follow these steps:

1. Clone the repository to your local development environment.

2. Install the required dependencies by running npm install in the project directory.

3. Open the project in your preferred code editor.

4. Review the existing code in the src directory to understand the initial structure and component hierarchy.

5. Implement the stopwatch functionality by modifying the necessary components (App.tsx, Stopwatch.tsx, StopwatchButton.tsx).

6. Run the application using npm start and test the stopwatch functionality.

7. Commit your changes regularly and push them to a branch in your forked repository.

8. Once you have completed the project goals, create a pull request to merge your changes into the main repository.

## Resources

Here are some resources that may be helpful during your work on this project:

- [React Documentation](https://reactjs.org/docs/getting-started.html) - Official documentation for React, providing detailed information on React concepts and usage.

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Official documentation for TypeScript, offering guidance on TypeScript features and usage.

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Explore React Testing Library, a popular testing library for React applications.
