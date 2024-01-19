# Enhanced Stopwatch Application - Shopify Assignment

Welcome to the enhanced version of the Shopify Stopwatch Assignment. This project extends the basic stopwatch functionality with features such as dark/light mode toggling, a lap timing table, the ability to clear laps without stopping the timer, and an export feature for laps data alongside all the basic functionality of a timer such as start, stop, reset, lap. Aimed at delivering a comprehensive time-tracking experience.

## New Features

- **Dark Mode/Light Mode**: Toggle between dark and light themes for optimal visibility.
- **Lap Timing Table**: Laps are displayed in a table, providing detailed time tracking.
- **Clear Table Option**: Clear laps independently of the stopwatch, enabling continuous measurement.
- **Export Laps**: Download a CSV file of all the recorded laps for external analysis.

## Overview

This enhanced stopwatch application, originally an assignment from Shopify, now includes additional features for a more comprehensive time-tracking experience. With a sleek dark/light mode functionality, a detailed lap timing table, the ability to clear laps without stopping the timer, and an export feature for laps data, this version of the stopwatch goes beyond the basics to meet advanced user needs.

## Deployment

Access the live deployment of the Enhanced Stopwatch Application here.
https://Haseebsyd.github.io/eng-intern-assessment-react

Experience the stopwatch in action and test its features in a live environment.

## Preview Video

Explore the functionality and features of the Enhanced Stopwatch Application in this comprehensive video. <video src="2024-01-18%2021-22-35.mp4" controls title="Title"></video>

## Table of Contents

- [New Features](#new-features)
- [Overview](#overview)
- [Deployment](#deployment)
- [Preview Video](#preview-video)
- [Table of Contents](#table-of-contents)
- [How It Works](#how-it-works)
- [Testing Approach](#testing-approach)
- [Example Test Case](#example-test-case)
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)


## How It Works

The Enhanced Stopwatch Application is built using React and leverages state management to handle the stopwatch's functionality. The main components include:

- `StopWatch`: Manages the overall stopwatch logic and state.
- `StopWatchButton`: Provides interactive buttons for controlling the stopwatch.
- `LapTable`: Displays recorded lap times along with options to clear and export laps.
- `DarkModeToggle`: Allows users to switch between dark and light modes for user comfort.

## Testing Approach
![Alt text](image.png)

The testing approach for the Enhanced Stopwatch Application is focused on simulating real user interactions and verifying the correctness of the application's state and behavior. The React Testing Library, alongside Jest, is used to provide a robust testing environment that allows us to render components, dispatch events, and assert on the results. The tests are designed to ensure that each feature of the stopwatch works as expected and that the user interface reflects the state changes accordingly.

The main testing strategies include:

- Mocking the `localStorage` API, as it behaves differently in the test environment compared to a web browser.
- Utilizing helper functions to wait for elements to appear and to simulate sequences of user actions.
- Testing the functionality of the stopwatch to start, stop, record laps, and reset.
- Verifying the dark mode toggle updates the application's class to reflect the user's preference.
- Ensuring that the lap times can be exported correctly by mocking document creation and download behaviors.

Each test case is isolated to prevent side effects and ensure test independence. Jest's mock functions (`jest.fn()`) are used to spy on and assert that specific actions were taken, such as creating elements and appending them to the DOM.

## Example Test Case

Here's an example of a test case for the "Export Laps as CSV" functionality:

```javascript
it('exports laps as CSV', async () => {
  // Prerequisite: laps need to be created to test export functionality
  createLaps();

  // Prepare mocks for the methods used in handleExport
  const mockClick = jest.fn();
  const mockSetAttribute = jest.fn();

  // Mock document.createElement and cast the returned object to an HTMLElement
  jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
    if (tagName === 'a') {
      return {
        setAttribute: mockSetAttribute,
        click: mockClick,
        href: '',
        download: '',
      } as unknown as HTMLElement;
    }
    return document.createElement(tagName);
  });

  // Mock document.body methods and cast the mock functions to the correct type
  const mockAppendChild = jest.fn();
  const mockRemoveChild = jest.fn();
  document.body.appendChild = mockAppendChild as unknown as typeof document.body.appendChild;
  document.body.removeChild = mockRemoveChild as unknown as typeof document.body.removeChild;

  // Wait for the export button to be available and simulate a click on it
  const exportButton = await waitForExportButton();
  fireEvent.click(exportButton);

  // Check that the mocked methods were called, which implies that the export functionality was triggered
  expect(mockSetAttribute).toHaveBeenCalled();
  expect(mockClick).toHaveBeenCalled();
  expect(mockAppendChild).toHaveBeenCalled();
  expect(mockRemoveChild).toHaveBeenCalled();

  // Clean up mocks to avoid side-effects in other tests
  jest.restoreAllMocks();
});
```
## Getting Started

To get started with the Enhanced Stopwatch Application:

1. Clone the repository: `git clone https://github.com/Haseebsyd/eng-intern-assessment-react/tree/feature/stopwatch-implementation`
2. Install dependencies: `npm install`
3. Start the application: `npm start`

OPTIONAL
4. Test the application: `npm test`




OLD README.MD BELOW
# Technical Instructions
1. Fork this repo to your local Github account.
2. Create a new branch to complete all your work in.
3. Write tests to ensure you've completed the requirements
3. Create a Pull Request against the main branch when you're done and all tests are passing

## Project Overview
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
    - Write unit tests for the stopwatch functionality to ensure it works correctly.
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
