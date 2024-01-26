import React, { useEffect } from "react";

type KeyBindingsProps = {
  isRunning: boolean;
  toggleStartStop: () => void;
  handleWorkout: () => void;
  handleLap: () => void;
  handleReset: () => void;
};

const KeyBindings: React.FC<KeyBindingsProps> = ({
  isRunning,
  toggleStartStop,
  handleWorkout,
  handleLap,
  handleReset,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case " ": // spacebar case
          toggleStartStop();
          break;
        case "w": // w/W case
        case "W":
          handleWorkout();
          break;
        case "Enter": // Enter case
          handleLap();
          break;
        case "r": // r/R case
        case "R":
          handleReset();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, toggleStartStop, handleWorkout, handleLap, handleReset]);

  return null; // component does not render anything
};

export default KeyBindings;
