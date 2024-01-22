import { Box } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

//managing the types of the props
type StopWatchProps = {
  isTimerOnRef: React.MutableRefObject<boolean>; //since we are going to update its value, Im using mutable type
  setTime: (time: number) => void; //this holds the elapsed time, stored in parent
  setDashArrayOffset: (dashArray: number) => void; //this updates the progress bar
  setisTimerOn: (isTimerOn: boolean) => void; //handles whether timer is tracking time
  dashArray: number; //the circumference of the timer, to draw the progress bar
  handleLap: () => void; //updates the lap array
  setLaps: (laps: number[]) => void; //access the lap array, so we can set it to 0 when reset is clicked.
  setLapTime: (lapTime:number)=>void;//current lap time state
};

export default function StopWatchButton({
  isTimerOnRef,
  setTime,
  setDashArrayOffset,
  setisTimerOn,
  dashArray,
  handleLap,
  setLaps,
  setLapTime
}: StopWatchProps) {
  const [started, setStarted] = useState<boolean>(false); //this flag checks to see if timer has started, its only false after each reset, or before the first start.

  //this function is used to handle the pause/play functionality.
  function toggletimer() {
    if (!isTimerOnRef.current) {
      setStarted(true); //started flag is turned on for first time. If timer is reset, then gets reset to false
      setisTimerOn(true); //trigger state change, to start the timer
      isTimerOnRef.current = true; //isTimerOn ref turned to true, when its false timer stops immediately.
    } else {
      isTimerOnRef.current = false;
      setisTimerOn(false);
    }
  }

  return (
    <>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        {/*only render reset button after timer has started */}
        {started && (
          <div
            data-testid="toggle-timer-reset"
            className="reset"
            onClick={() => {
              setisTimerOn(false); //turn off the timer, which triggers useEffect
              setTime(0); //reset the time
              setLapTime(0);//reset current lap time
              setDashArrayOffset(dashArray); //reset the progress bar to 0
              setStarted(false); //set started flag to false when pressing reset, hiding reset button and resetting timer.
              setLaps([]); //reset array containing the lap times
              isTimerOnRef.current = false; //turn off timer
            }}
          >
            <button aria-label="reset button">reset</button>
          </div>
        )}
        {/*conditionally render pause/play buttons based on if timer is running */}
        <div
          className={!isTimerOnRef.current ? "start" : "pause"}
          data-testid="toggle-timer-button" // Unique identifier for querying the button in tests.
          onClick={() => {
            toggletimer();
          }}
        >
          <button aria-label={isTimerOnRef.current ? "pause" : "start"}>{isTimerOnRef.current ? "pause" : "start"}</button>
        </div>
        {/*render lap button only if timer has started, hide lapbutton when timer isnt runnin */}
        {started && (
          <div
            data-testid="toggle-timer-lap"
            onClick={() => {
              handleLap();
            }}
            className={isTimerOnRef.current ? "lap" : "lapinvisible"}
          >
            <button aria-label="lap button">lap</button>
          </div>
        )}
      </Box>
    </>
  );
}
