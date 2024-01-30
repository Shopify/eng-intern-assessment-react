
# Code Summary
Each button has their own functions, and is fired when the 'said' button is clicked. When the lap button is pressed, it dynamically generates elements to display directly on the DOM, the times are displayed as follows: the lap number, the current time (when pressed) and the time difference or the lapsed time. (I am unsure if this is the right calculations but I think its just the difference between the previous time and the start time. - Instructions unclear.) For god sake, I can't get it to style properly so it's more easily readable but whatever. I think the code could do some work to but I'm an amateur and have been stuck with the lap future for so long, even the test isn't perfect for that part of the app!!! 

I wasn't sure about the project structure, as it seems to be following an MVC principle which I don't think react works with, but regardless I tried to implement it to the best of my abilities. (which isn't much). 

# How it works
The timer has four buttons (one is hidden) as described: 
(First Button(s)):
Play - the timer will start at 00:00:00 which then goes up as each second passes (will be hidden, once pressed as the stop button will take it's place)
Stop - this will pause or stop the timer from incrementing (only appears after the play button has been pressed, will hide again when pressed again)
Second Button:
Reset - resets the timer back to 00:00:00 and clears the dom of lap times
Third Button:
Lap Time - records the lapsed time every time the button is clicked

# TODO
These are the following bugs I am aware of and need to be fixed (possibly in said future, if i feel like coming back to this...)
1. The buttons are a bit finicky such as when you use the lap button while the timer is still running, the stop button will feel like it's not working. But if you click on it at a specific spot it will work (you know this when the mouse cursor changes to the hand symbol). I think it might be because I used react-icons as a button rather than text??? 
2. The styling for the times displayed
3. Need cleaner code, but I am sick of this project now....didn't just take two days. I'm an amateur, what do you want from me!! (Probably won't be selected but w.e, I wanted to attempt this challenge anyways, although I know life isn't going to give me a chance and I'm just going to be rejected) 

# Functions
- Start the stopwatch to begin counting time.
- Stop the stopwatch to pause the timer.
- Displays Laps when a button is pressed.
- Reset the stopwatch to zero. 

# Tests
 Test 1: Render the app component
 Test 2: Starts and stop the stopwatch
 Test 3: Records and Display the Lap Times
 Test 4: Resets the stopwatch

 Ding! Ding! Ding! All tests passed! 

If you read this far, thanks for taking the time to actually look at my application! Though, I'm sure I won't be hearing from you...so I hope you have a good day! I know I won't...so please don't send that rejection email just don't! I prefer the silent treatment (assuming this is going to be a rejection). 