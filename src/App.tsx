import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./App.css";

/**
 * The main component of the application, displaying the stopwatch and buttons.
 */
const App = () => {
	const [time, setTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
	const [laps, setLaps] = useState<string[]>([]);
	const [isStopped, setIsStopped] = useState(false);

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
	const handleStart = () => {
		setTimerOn(true);
		setIsStopped(false);
	};

	const handleStop = () => {
		setTimerOn(false);
		setIsStopped(true);
	};

	const handlePause = () => setTimerOn(false);

	const handleResume = () => setTimerOn(true);

	const handleReset = () => {
		//Set time to 0, set the timer off and clear the laps array
		setTime(0);
		setTimerOn(false);
		setLaps([]);
	};

	const handleLap = () => {
		// Add the current time to the laps array
		setLaps((prevLaps) => [...prevLaps, formatTime(time)]);

		// Function to format time into "hh:mm:ss" string
		const formatTime = (time: number) => {
			//Logic and calculations used to calculate the time
			const seconds = Math.floor(time / 1000);
			const getSeconds = `0${seconds % 60}`.slice(-2);
			const minutes = Math.floor(seconds / 60);
			const getMinutes = `0${minutes % 60}`.slice(-2);
			const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

			// Return the formatted time
			const formattedTime = `${getHours}:${getMinutes}:${getSeconds}`;
			return formattedTime;
		};
	};

	return (
		<div>
			{/**Pass in props to each component */}
			{!isStopped && <StopWatch time={time} />}
			<StopWatchButton
				onStart={handleStart}
				onStop={handleStop}
				onReset={handleReset}
				onLap={handleLap}
				onPause={handlePause}
				onResume={handleResume}
			/>
			{/**Render the laps array */}
			<div data-testid="lap-list">
				{laps.map((lapTime, index) => (
					<div key={index}>{lapTime}</div>
				))}
			</div>
		</div>
	);
};

export default App;
