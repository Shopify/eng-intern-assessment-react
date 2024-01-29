## Deniz Jasarbasic's Stopwatch Implementation

### 🌊 Introduction
Hey, my name is [Deniz Jasarbasic](https://denizjasarbasic.com) and welcome to my stopwatch implementation! The `feature/stopwatch` branch introduces a stopwatch with start, stop, reset, and lap functionality. Below, I'll walk you through my process of building the stopwatch from start to finish, including a quick demo, design details, features, and my testing process. Enjoy :)


### 📹 Demo
https://github.com/Shopify/eng-intern-assessment-react/assets/46465622/9f4f8825-882b-4889-a644-e35865d52940


### 🎨 Design
I started by curating a collection of stopwatch designs for inspiration from popular design resources like Dribbble and Pinterest. With a chosen theme in mind, I quickly mocked-up all aspects, including views, states, buttons, typography, and color palettes. Finally, I created a checklist of technical requirements, then jumped into the coding phase.


### ⚡ Key Resources

- Design Board: https://www.figma.com/file/RcI4KVHIoJaZ2lQ9OOVdZI/Shopify-Front-End-Online-Assessment---Deniz-Jasarbasic?type=design&node-id=0%3A1&mode=design&t=jsMEJCbTzY7wEjXn-1
- Documentation: https://quilled-sky-f24.notion.site/Stopwatch-bb0f233592094fba8e473fa0eaed37bf?pvs=25


### 🚀 Changes

Changes to `app.tsx`:
- Added state variables to track time, running state, and laps.

Changes to `StopWatch.tsx`:
- Displays the `time` prop in HH:MM:SS:mm format.
- Displays the `laps[]` list in a table along with key lap info (Lap No. and time).

Changes to `StopWatchButton.tsx`:
- Dynamic buttons based on the stopwatch's state (running or not). Users can Start, Stop, Reset, and Lap.

Added:
- `Styles.css` - global stylesheet with color theme, font, and button styles.
- `__test__/` - durable test cases that cover the stopwatch counting functionality and key UI features.


### 🧪 Tests

Passes all test cases that cover the stopwatch counting functionality, including edge cases (00:00:00:00 at the initial and reset states), ensuring that lap times match when the 'Lap' button is pressed, and successfully checks key UI features, namely the 'Start,' 'Stop,' 'Reset,' and 'Lap' buttons.

<img width="532" alt="stopwatch_tests" src="https://github.com/Shopify/eng-intern-assessment-react/assets/46465622/de0d34aa-8bb4-41ed-aa82-7a9b00d73908">

---
Original ReadMe:

# Technical Instructions
1. Fork this repo to your local Github account.
2. Create a new branch to complete all your work in.
3. Write tests to ensure you've completed the requirements
3. Create a Pull Request against the main branch when you're done and all tests are passing

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
