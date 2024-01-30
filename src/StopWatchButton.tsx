import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useStopWatchContext } from "./Context";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";

export default function StopWatch() {
  const { addLap, start, pause, reset, hasStarted, isRunning } =
    useStopWatchContext();

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
        onClick={isRunning ? pause : start}
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
