import React, { useRef, useState } from "react";
import StopWatchButton from "./StopWatchButton";

// helper for pretty printing the time elapsed
const ParseTimeMs = (ms: number): string => {
	var mins = Math.trunc(ms / (1000 * 60));
	var secs = Math.trunc((ms / 1000) % 60);
	var mis = Math.floor(ms % 1000);

	return `${mins}m ${secs}s ${mis}ms`;
};

export default function StopWatch() {
	// minimum increment interval (10 is minimum accepted by window.setInterval)
	const timerIncrementMs = 10;

	// stores the interval id returned by window.setInterval, saved for use in removing the interval when stopped
	const intervalId = useRef(0);
	// is the timer paused?
	const [pause, setPause] = useState<boolean>(false);
	// does the interval exist?
	const [exists, setExists] = useState<boolean>(false);
	// the current time elapsed
	const [time, setTime] = useState<number>(0);
	// lap records
	const [laps, setLaps] = useState<number[]>([]);

	// resets time, removes existing interval and constructs a new one, and starts a stopwatch
	const startTime = () => {
		stopTime();
		const id = window.setInterval(() => {
			// prevent stale closure
			setPause((p) => {
				if (!p) {
					setTime((prevTime) => prevTime + timerIncrementMs);
				}
				return p;
			});
		}, timerIncrementMs);
		intervalId.current = id;
		setExists(true);

		setPause(false);
	};

	// toggle pausing button
	const togglePause = () => {
		setPause(!pause);
	};

	// destroys the interval
	const stopTime = () => {
		window.clearInterval(intervalId.current);
		setExists(false);
		setPause(true);
		setTime(0);
		setLaps([]);
	};

	return (
		<div
			style={{
				minWidth: "20vw",
				border: "1px solid black",
				padding: "4px",
				fontFamily: "sans-serif",
			}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<p
					style={{
						fontSize: 24,
					}}>
					{ParseTimeMs(time)}
				</p>
				<StopWatchButton
					timerState={{
						exists: exists,
						time: time,
						isPaused: pause,
					}}
					onStartClicked={startTime}
					onLapClicked={() => {
						setLaps([...laps, time]);
					}}
					onStopClicked={stopTime}
					onPauseClicked={togglePause}
				/>
			</div>
			{laps.map((v: number, i: number) => (
				<p key={i}>{`Lap ${i}: ${ParseTimeMs(v)}`}</p>
			))}
		</div>
	);
}
