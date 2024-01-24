# Project Overview
This project is to implement a stopwatch application using React and TypeScript. The stopwatch should have the following functionality:

- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero.

This project is implemented by Shahid Salha
  
### Project Functionality
- [x] The stopwatch should start counting when the user clicks the start button.
- [x] The stopwatch should stop counting when the user clicks the stop button.
- [x] The stopwatch should reset to zero when the user clicks the reset button.
- [x] The stopwatch should record and display laps when user clicks the lap button.

### Implementation:
- By default, the 'Start' and 'Reset' buttons are displayed.
- When the 'Start' button is clicked:
    - The 'Start' button will sitch to 'Stop'
    - The 'Reset' button will switch to 'Lap'
    - And the timer would start recording
- When the 'Stop' button is clicked:
    - The timer will pause
    - The buttons will return to their default state (Start and Reset)
- The 'Reset' button resets the timer and the laps
- The 'Lap' button records the time for the lap
- At the beginning, the timer format is `ss.mm`. When the time goes pas a minute, the format changes to `MM:ss.mm`.


## Project Demo
![image](https://github.com/shaded-shade/eng-intern-assessment-react/assets/114317408/c85a9f98-c777-4b9f-8ff4-85eb94c514bf)
![image](https://github.com/shaded-shade/eng-intern-assessment-react/assets/114317408/d5966953-bc71-4961-82fb-5ca27ea5da42)
![image](https://github.com/shaded-shade/eng-intern-assessment-react/assets/114317408/c0ebec3f-d00a-4f0c-b566-5cb16f8326aa)


## Test Results
![image](https://github.com/shaded-shade/eng-intern-assessment-react/assets/114317408/bda032b3-7973-4fb7-9832-9d236be69293)
