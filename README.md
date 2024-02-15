Application email address: duanx14@mcmaster.ca

## Description
Introducing an elegantly designed and simple-to-use stop watch, perfect for timing needs with enhanced precision and user experience. This stop watch stands out with its start, pause, and lap functions, augmented by subtle animations that make the interface intuitive and smooth. It features a responsive layout, ensuring seamless use across various devices, and incorporates a Swift UI-styled dark mode for eye comfort, especially in low-light environments.

What sets this Stop Watch apart is its reliance on setInterval to fetch Date.now() for timing, a method chosen for its superior accuracy, reducing time drift over extended periods – a common issue in traditional auto-incrementation methods.

The app's architecture leverages the Context API for efficient prop passing. The modular design of the Button component not only simplifies development but also facilitates future expansion and customization.

Moreover, its cross-platform compatibility and adaptive layout make it a reliable tool for users on desktops, tablets, or mobile devices. The app has undergone rigorous user testing to ensure a frictionless and intuitive user experience.

## Tasks
- [x] The stopwatch should start counting when the user clicks the start button.
- [x] The stopwatch should stop counting when the user clicks the stop button.
- [x] The stopwatch should reset to zero when the user clicks the reset button.
- [x] The stopwatch should record and display laps when user clicks the lap button.

## Testing
### Additional package
Install the above packages to help with test. 
```
npm install babel-jest
npm install jest-environment-jsdom
```
Write unit tests for all modules were used in this project.
## Demo
https://github.com/Shopify/eng-intern-assessment-react/assets/97914968/9d59b20d-9280-4dff-a4c5-d9539a58656e

## Changes
`App.tsx`: Main component contains stopwatch, buttons, lap records and theme toggle button

`StopWatch.tsx`: The component which display the time

`StopWatchButton.tsx`: The component contains all the button logic

`StopWatchRecord.tsx`: The component to show the records

`SWContextProvider.tsx`: Context provider provide all the states and setStates

`SWContext.tsx`: Context type indicates what is in the context

`index.tsx`: Wrapped up by context provider
 
`utils.tsx`: Some functions to help format the time

`App.css`: Styles for App

`StopWatch.css`: Styles for StopWatch

`StopWatchButton.css`: Styles for StopWatchButton

`StopWatchRecord.css`: Styles for StopWatchRecord
