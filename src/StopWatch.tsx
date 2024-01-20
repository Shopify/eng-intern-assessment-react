import React from "react";
import { Box} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function StopWatch() {
  let [time, setTime] = useState<number>(0); //manage time state
  let [isTimerOn, setisTimerOn] = useState<boolean>(false); //manage status of timer

  useEffect(() => {
    let interval: number | null = null;
    if (isTimerOn) {
      //increment timer by 10ms when timer started
      interval = window.setInterval(() => {
        setTime((prev) => (prev += 10));
      }, 10);
    } else {
      clearInterval(interval); //reset timer when timer is off
    }
    return () => clearInterval(interval); //clear interval when component unmounts
  }, [isTimerOn]);

  return (
    <>
      <Box
        borderRadius={"full"}
        backgroundColor={'gray'}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"center"}
        border={""}
        width={""}
        height={""}
      >
        <text>
          {("0" + (Math.floor(time / 60000) % 60)).toString().slice(-2) + ":"}
        </text>
        {/*I had to round down to get whole seconds */}
        <text>
          {("0" + (Math.floor(time / 1000) % 60)).toString().slice(-2) + ":"}
        </text>
        {/* i had to convert to string, so i could slice the 3rd digit,
            this fixes formatting issues when ms is under 10, adding a placeholder 0
        */}
        {<text>{("0" + ((time / 10) % 100)).toString().slice(-2)}</text>}
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <button
          onClick={() => {
            setisTimerOn(true);
          }}
        >
          start
        </button>
        <button
          onClick={() => {
            setisTimerOn(false);
          }}
        >
          pause
        </button>
        <button
          onClick={() => {
            setisTimerOn(false);
            setTime(0);
          }}
        >
          reset
        </button>
        <button>lap</button>
      </Box>
    </>
  );
}
