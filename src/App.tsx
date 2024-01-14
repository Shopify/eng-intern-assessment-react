import React, { useState, useEffect } from "react";
import StopWatch from "./StopWatch";
import StopWatchButton from "./StopWatchButton";
import "./App.css";

const App = () => {
	const [time, setTime] = useState(0);
	const [timerOn, setTimerOn] = useState(false);
	const [laps, setLaps] = useState([]);
	const [isStopped, setIsStopped] = useState(false);

	useEffect(() => {
		let interval: number | null = null;

		if (timerOn) {
			interval = window.setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		} else if (interval !== null) {
			clearInterval(interval);
		}

		return () => {
			if (interval !== null) clearInterval(interval);
		};
	}, [timerOn]);

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
		setTime(0);
		setTimerOn(false);
		setLaps([]);
	};

	// Moved formatTime function here
	const formatTime = (time: any) => {
		const seconds = Math.floor(time / 1000);
		const getSeconds = `0${seconds % 60}`.slice(-2);
		const minutes = Math.floor(seconds / 60);
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

		return `${getHours}:${getMinutes}:${getSeconds}`;
	};

	const handleLap = () => {
		setLaps((prevLaps) => [...prevLaps, formatTime(time)]);
	};

	return (
		<div>
			{!isStopped && <StopWatch time={time} />}
			<StopWatchButton
				onStart={handleStart}
				onStop={handleStop}
				onReset={handleReset}
				onLap={handleLap}
				onPause={handlePause}
				onResume={handleResume}
			/>
			<div className="lap-list" data-testid="lap-list">
				{laps.map((lapTime, index) => (
					<div key={index} className="lap-item">
						{lapTime}
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
