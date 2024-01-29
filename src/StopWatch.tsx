import React from 'react';
import { useEffect } from 'react';
import StopWatchButton from './StopWatchButton'; // import StopWatchButton component

export default function StopWatch() {
  let [count, setCount] = React.useState(0); // count variable
  let [isOn, setIsOn] = React.useState(false); // boolean for stop watch to continue or stop
  useEffect(() => {
    if (!isOn) return; // if isOn is false the setInterval will not be executed

    //setInterval timeCounter
    const timerCount = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      console.log(isOn);
    }, 1000);

    return () => {
      clearInterval(timerCount);
    };
  }, [isOn]);

  const stopTimer = () => setIsOn(false);
  const startTimer = () => setIsOn(true);
  const resetTimer = () => setCount(0);

  return (
    <>
      {/* Display */}
      <h1>Stop Watch Display ⌚</h1>
      <h2>{count}</h2>

      {/* Buttons */}
      <StopWatchButton
        stopCount={stopTimer}
        startCount={startTimer}
        resetCount={resetTimer}
      />
    </>
  );
}
