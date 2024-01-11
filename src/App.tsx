import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";

/**
 * The main component of the application, displaying the stopwatch and buttons.
 */
const App: React.FC = () => {
	const [time, setTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);

	useEffect(() => {
		let interval: any = null;

		if (timerOn) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10); // Update time every 10 milliseconds
			}, 10);
		} else {
			clearInterval(interval); // Clear interval if timer is not on
		}

		return () => clearInterval(interval);
	}, [timerOn]);

	//Functions to start the timer, stop the timer, and reset the timer
	const handleStart = () => setTimerOn(true);

	const handleStop = () => setTimerOn(false);

	const handleReset = () => {
		setTime(0);
		setTimerOn(false);
	};

	return (
		<div>
			{/**Pass in props to each component */}
			<StopWatch time={time} />
			<StopWatchButton
				onStart={handleStart}
				onStop={handleStop}
				onReset={handleReset}
			/>
		</div>
	);
};

export default App;
