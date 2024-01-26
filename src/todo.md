
# To-do:

- [✅] Implement the stopwatch functionality:
    - [✅] The stopwatch should start counting when the user clicks the start button.
    - [✅] The stopwatch should stop counting when the user clicks the stop button.
    - [✅] The stopwatch should reset to zero when the user clicks the reset button.
    - [✅] The stopwatch should record and display laps when user clicks the lap button.

- [x] Ensure code quality:
    - [x] Write clean, well-structured, and maintainable code.
    - [x] Pay attention to code readability, modularity, and performance.

- [x] Test your code using React Testing Library:
    - [x] Write unit tests for the stopwatch functionality to ensure it works correctly.
    - [x] Verify that the stopwatch starts, stops, resets, and records laps as expected.
    
    - [x] Tests to add:
        Start/Stop/Reset Buttons:
        - [x] Start button starts the timer
        - [x] Stop button stops the timer
        - [x] Reset button resets the timer

        Lap Button:
        - [x] Lap button adds a lap
        - [x] Lap button adds a lap with the correct time
        - [x] Lap button adds a lap with the correct time when the timer is stopped
        - [x] Lap button adds a lap with the correct time when the timer is reset

        Workout Button:
        - [x] Increase workout cannot be clicked when the timer is running (only in stop state)

        Scrolling Background:
        - [x] Background scrolls when the timer is running
        - [x] Background does not scroll when the timer is stopped
        - [x] Background scrolls in relation to workout stat (slow version - Workout level 1)
        - [x] Background scrolls in relation to workout stat (med version - Workout level 20)
        - [x] Background scrolls in relation to workout stat (fast version - Workout level 80)

        Sprite:
        - [x] Sprite shows standing animation when the timer is stopped
        - [x] Sprite shows running animation when the timer is running - slow run version
        - [x] Sprite shows running animation when the timer is running - med run version
        - [x] Sprite shows running animation when the timer is running - fast run version

- [x] Code documentation:
    - [x] Document your code by adding comments and explanatory notes where necessary.
    - [x] Provide clear explanations of the implemented functionality and any important details.

- [x] Accessibility:
    - [x] Ensure that the application is accessible and usable by people with disabilities.
    - [x] Use semantic HTML elements and ARIA attributes to improve the accessibility of the application.
    - [x] Use the ChromeVox screen reader to test the accessibility of the application.

- [x] Styling

- [x] Responsive

- [x] README.md
    - [x] Add project overview
    - [x] Add project setup
    - [x] Add project goals
    - [x] Add getting started
    - [x] Credits/inspiration

- [x] Fix site title, add favicon

- [✅] Add infinitely scrolling track game with start, stop, reset, and lap buttons:
    - The scroll should start when the user clicks the start button and continue running when lap is clicked
    - The scroll should stop when the user clicks the stop and reset buttons
    - Scroll should move with the workout stat/distance, and speed up or slow down depending on the workout stat

- [✅] Add running sprite with start, stop, reset, and lap buttons:
    - The running animation should start when the user clicks the start button and continue running when lap is clicked
    - The running animation should stop when the user clicks the stop and reset buttons
    - Should move with the workout stat/distance, and speed up or slow down depending on the workout stat

- [✅] Bug Fixes:
    - [✅] When Sonic stands still and increase workout is clicked the scrolling background moves
        - Distance, time, lap do not change, just the scrolling background
    - [✅] When reset/refreshed and time, distance, lap are 0, adding a lap with 0 time and 0 distance
          gets added, should not allow adding a lap if stopped and 0 time and 0 distance

- [x] Maybe additions?
    - [✅] Have "workout" button to increase distance ran, using a "workout" stat
        - [x] Have animation speed up or slow down depending on "workout" stat
    - [x] When start, stop, reset, lap clicked, have text and sound effect pop up
    - [x] Multiple sprites to choose from?
    - [x] 8-bit music?
    - [x] Add current meters/sec in same style as current distance, lap, workout level box
    - [x] Shadow under sprite semi-transparent 