import React from "react";
import StopWatchButton from "./StopWatchButton";

interface ButtonFactoryProps {
  time: number;
  timeOn: boolean;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setTimeOn: React.Dispatch<React.SetStateAction<boolean>>;
  setLappedTimes: React.Dispatch<React.SetStateAction<number[]>>;
}

/* 
Inputs: States to be managed by buttons
Outputs: Individual buttons that perform the specified function onClick
*/
const ButtonFactory = ({
  time,
  timeOn,
  setTime,
  setTimeOn,
  setLappedTimes,
}: ButtonFactoryProps) => {
  // Button logic handle functions
  const handleTimeReset = () => {
    setTime(0);
    setLappedTimes([]);
  };
  const handleTimeStart = () => {
    setTimeOn(true);
  };
  const handleTimeStop = () => {
    setTimeOn(false);
  };
  const handleLapClick = () => {
    setLappedTimes((prevTimes) => [time, ...prevTimes]);
  };

  return (
    <>
      <StopWatchButton
        type="Restart"
        onBtnClick={handleTimeReset}
        isDisabled={timeOn}
      />
      <StopWatchButton
        type="Start"
        onBtnClick={handleTimeStart}
        isDisabled={timeOn}
      />
      <StopWatchButton
        type="Stop"
        onBtnClick={handleTimeStop}
        isDisabled={!timeOn}
      />
      <StopWatchButton
        type="Lap"
        onBtnClick={handleLapClick}
        isDisabled={!timeOn}
      />
    </>
  );
};

export default ButtonFactory;
