import React from "react";
import { Box, UnorderedList, ListItem } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
  const [laps, setLaps] = useState<number[]>([]);

  const [time, setTime] = useState<number>(0); //manage time state
  const [lapTime, setLapTime] = useState<number>(0);
  const [isTimerOn, setisTimerOn] = useState<boolean>(false); //manage status of timer'
  const isTimerOnRef = useRef(isTimerOn); //used for toggletimer in button component, to immediately change the isTimerOn state.
  const intervalRef = useRef(null); //used for toggletimer, to immediately clear interval when pausing or stopping timer
  //this will make stop buttons responsive, and stop the progress bar synchronously
  //relying on state changes to isTimerOn to stop timer is slow and asynchrous
  const radius: number = 85;
  const dashArray: number = radius * Math.PI * 2; //lap progress bar circumference
  const duration: number = laps.reduce((a, b) => a + b, 0) / laps?.length; //how many ms you want the lap progress bar to complete 1 cycle, ? safeguards against runtime
  //one cycle should be the duration of the average of all laps
  const intervals: number = 10; //the amount of ms in 1 interval, which is 10ms set by window.setinterval
  const decrementAmount: number = dashArray / (duration / intervals); //The total duration of one cycle, when divided by
  //the interval duration, gives you the number of intervals
  //needed to complete a single cycle. This is what you decrement the lap progress bar.

  const [dashArrayOffset, setDashArrayOffset] = useState<number>(dashArray); //state of lap progress bar

  //the lap button's functionality
  const handleLap = function () {
    setLaps((prev) => [...prev, lapTime]); //adds the lap time of previous lap
    setDashArrayOffset(dashArray); //reset the lap progress bar to 0
    setLapTime(0); //reset lap time
  };

  //handle primary timer and lap timer, and lap progress bar increasing
  useEffect(() => {
    if (isTimerOn) {
      intervalRef.current = window.setInterval(() => {
        //immediately clear interval when isTimerOnRef is false (triggered by stop button and pause)
        //this check every 10ms is needed to keep timer synchronous with stop and pause button
        if (!isTimerOnRef.current) {
          clearInterval(intervalRef.current);
          return;
        }
        //only show lap progress bar after lap button pressed
        laps.length > 0 &&
          setDashArrayOffset((prev) => {
            while (prev > 0) {
              //lap progress bar is filled when state of progressbar reaches 0, (dasharrayoffset is 0)
              prev -= decrementAmount;
              return prev;
            }
          });

        setTime((prev) => (prev += 10)); //increment time
        setLapTime((prev) => (prev += 10)); //increment lap time
      }, 10);
    } else {
      clearInterval(intervalRef.current); //stop timer
    }
    return () => intervalRef.current && clearInterval(intervalRef.current); //cleanup if interval exists
  }, [isTimerOn, laps]);

  return (
    <>
      <Box
        borderRadius={"full"}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <svg
          width={"230px"}
          height={"230px"}
          viewBox="0 0 230px 230px"
          className="timerBody"
        >
          <circle
            transform="rotate(-90 115 115)" //rotate -90 degrees, on origin which is half of 230px of svg height and width
            cx="115" // Center of the viewBox (230/2)
            cy="115"
            r={radius}
            strokeWidth="8"
            fill="none"
            stroke="#e4fcd4"
            style={{
              strokeDasharray: dashArray, //wrap entire circle with progress bar
              strokeDashoffset: dashArrayOffset, //we manipulate starting point to give illusion of growing progress bar
            }}
          />
        </svg>
        <Box position={"absolute"}>
          <div className="digitalDisplay" data-testid="time-display">
            <span>
              {("0" + (Math.floor(time / 60000) % 60)).toString().slice(-2) +
                ":"}
            </span>
            {/*I had to round down to get whole seconds */}
            <span>
              {("0" + (Math.floor(time / 1000) % 60)).toString().slice(-2) +
                ":"}
            </span>
            {/* i had to convert to string, so i could slice the 3rd digit from left,
            this fixes formatting issues when ms is under 10, adding a placeholder 0
        */}
            <span>{("0" + ((time / 10) % 100)).toString().slice(-2)}</span>
          </div>
        </Box>
      </Box>
      <StopWatchButton //pass props to button component, to update state
        isTimerOnRef={isTimerOnRef}
        setTime={setTime}
        setDashArrayOffset={setDashArrayOffset}
        setisTimerOn={setisTimerOn}
        dashArray={dashArray}
        handleLap={handleLap}
        setLaps={setLaps}
      />
      
      <Box //This div contains the list of laps, and current lap time
        listStyleType={"none"}
        marginTop={"30px"}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        maxHeight={"8rem"}
        overflowY={"scroll"}
      >
        <UnorderedList listStyleType={"none"} margin={"0"}>
          {/* This displays the current lap elapsed time */}
          <ListItem data-testid="current-lap-display" >
            <span>
              {("0" + (Math.floor(lapTime / 60000) % 60)).toString().slice(-2) +
                ":"}
            </span>
            <span>
              {("0" + (Math.floor(lapTime / 1000) % 60)).toString().slice(-2) +
                ":"}
            </span>
            <span>{("0" + ((lapTime / 10) % 100)).toString().slice(-2)}</span>
          </ListItem>

          {/* This displays a list of laps */}
          {laps.map((lap, index) => {
            return (
              <div data-testid="lap-list-display" key={index} >
                <ListItem>
                  <span>
                    {("0" + (Math.floor(lap / 60000) % 60))
                      .toString()
                      .slice(-2) + ":"}
                  </span>
                  <span>
                    {("0" + (Math.floor(lap / 1000) % 60))
                      .toString()
                      .slice(-2) + ":"}
                  </span>
                  <span>{("0" + ((lap / 10) % 100)).toString().slice(-2)}</span>
                </ListItem>
              </div>
            );
          })}
        </UnorderedList>
      </Box>
      ;
    </>
  );
}
