# Description

This is a user-friendly Shopify-themed stopwatch with a simple interface and essential features. Click the 'Start' button to initiate the timer, and if you need to pause, hit 'Stop' to freeze the current time display. For tracking multiple time intervals, use the 'Lap' button, and it will neatly list all your laps below the timer, with the latest lap being on top. To reset the timer and clear all laps, just click 'Reset.' Additionally, this web application features cool animations beside the stopwatch displaying the top 15 biggest companies that use Shopify.

# Changes

- ```App.tsx``` displays the stopwatch component
- ```StopWatch.tsx``` contains the functionality for the stopwatch
- ```StopWatchButton.tsx``` is a button component that is used in ```StopWatch.tsx``` 
- ```src/styles``` contains ```StopWatch.css`` and ```StopWatchButton.css```, which have the styling for the components
- ```src/logos``` contains the images of all the company logos displayed
- ```StopWatch.test.tsx``` contains the unit tests for the functionality of the stopwatch

# Testing

- Verified that the stopwatch starts, stops, resets, and records laps as expected
- Made sure all test cases passed
- May need to install the following dependencies for tests:
     - ```npm install --save-dev jest @testing-library/react``` 
     - ```npm install --save-dev jest-environment-jsdom```
     - ```npm install --save-dev identity-obj-proxy```

# Demo


https://github.com/Shopify/eng-intern-assessment-react/assets/117491988/cbe01214-01b2-47ea-b3e7-be531342dcf7


### Thank you for your consideration and I hope to hear back from you soon.
