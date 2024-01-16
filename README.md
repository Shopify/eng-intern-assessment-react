---
created: 2023-01-15
author: David Cao
---

<h1 align='center'>David's Stopwatch</h1>
<h4 align='center'>My shopify intern assessment challenge</h4>
<br>

<!-- Video walkthrough or image -->
https://github.com/dave-cao/david-cao-eng-intern-assessment-react/assets/63488152/64b2ea91-9cea-46ec-b66f-b52644287aa8

<br>

<!-- List links to the project here (eg: live-link, youtube video) -->
- **Visit the project at: https://davidcao.xyz/david-cao-eng-intern-assessment-react/** (github-pages)
- **Demonstration Video: https://youtu.be/i4ZT6IjP8dE**

## About

This project is a front-end challenge for Shopify's summer 2024 internship application.

### Project Overview
The goal of this project is to implement a stopwatch application using React and TypeScript. The stopwatch should have the following functionality:

- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

### Project Goals
Your specific goals for this project are as follows:

1. Implement the stopwatch functionality:
    - [x] The stopwatch should start counting when the user clicks the start button.
    - [x] The stopwatch should stop counting when the user clicks the stop button.
    - [x] The stopwatch should reset to zero when the user clicks the reset button.
    - [x] The stopwatch should record and display laps when user clicks the lap button.

2. Ensure code quality:
    - [x] Write clean, well-structured, and maintainable code.
    - [x] Follow best practices and adhere to the React and TypeScript coding conventions.
    - [x] Pay attention to code readability, modularity, and performance.

3. Test your code:
    - [x] Write unit tests for the stopwatch functionality to ensure it works correctly.
    - [x] Verify that the stopwatch starts, stops, resets, and records laps as expected.

4. Code documentation:
    - [x] Document your code by adding comments and explanatory notes where necessary.
    - [x] Provide clear explanations of the implemented functionality and any important details.

#### Extra Features

- [x] separate css file to style components
- [x] mobile responsive
- [x] keyboard shortcuts
    - space-bar to start / stop
    - "l" to lap
    - "r" to reset
- [x] uses Date object to improve accuracy of time

## Notes

A pretty fun project to work on for an internship application. This was the first time I used Typescript and React unit testing so I learned a bunch of cool new things!

### Added Dependencies

- Added `jest-environment-jsdom` and `jsdom` to `package.json` to help with testing. 

```bash
npm install jest-environment-jsdom
npm install jsdom
```

- Added `@jest-environment jsdom` at top of testing file
- Modified in `package.json`:
```json
"scripts": {
    "test": "jest",
}
```
to
```json
"scripts": {
    "test": "jest --env=jsdom",
}
```

<!-- CONTACT -->
## Contact

#### David Cao
- Email: sirdavidcao@gmail.com
- Personal Website: https://davidcao.xyz/
- [Other Projects](https://davidcao.xyz/legacy-portfolio/ProjectsPage/index.html)
- [Youtube](https://www.youtube.com/channel/UCEnBPbnNnqhQIIhW1uLXrLA)
- [Linkedin](https://www.linkedin.com/in/david-cao99/)
