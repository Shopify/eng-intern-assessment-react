import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useStopWatchContext } from "./Context";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipEndFill,
} from "react-icons/bs";
import { motion } from "framer-motion";

export default function StopWatch() {
  const {
    laps,
    addLap,
    start,
    pause,
    reset,
    formatTime,
    hasStarted,
    isRunning,
  } = useStopWatchContext();
  console.log({ isRunning });
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {hasStarted ? (
        <Button
          as={motion.button}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
          transitionDuration="75ms"
          w="15%"
          _focus={{
            outline: "none",
          }}
          onClick={reset}
          borderRadius="xl"
        >
          Reset
        </Button>
      ) : (
        <></>
      )}
      <Button
        as={motion.button}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.975 }}
        transitionDuration="75ms"
        w="25%"
        ml="2.5"
        mr="2.5"
        leftIcon={
          isRunning ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />
        }
        _focus={{
          outline: "none",
        }}
        onClick={() => {
          if (isRunning) pause();
          else start();
        }}
        borderRadius="xl"
      >
        {isRunning ? "Pause" : "Start"}
      </Button>
      {hasStarted ? (
        <Button
          as={motion.button}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
          transitionDuration="75ms"
          w="15%"
          _focus={{
            outline: "none",
          }}
          onClick={addLap}
          borderRadius="xl"
        >
          Lap
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
}
