import React, { useRef, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
	const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
	const [laps, setLaps] = useState<number[]>([]);
	const intervalRef = useRef<NodeJS.Timer>(null);

	function startStopwatch() {
		intervalRef.current = setInterval(
			() => setElapsedMilliseconds((prev) => prev + 10),
			10,
		);
	}

	function stopStopwatch() {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	}

	function resetStopwatch() {
		if (intervalRef.current !== null) {
			stopStopwatch();
		}

		setElapsedMilliseconds(0);
		setLaps([]);
	}

	function addLap() {
		setLaps((prev) => [elapsedMilliseconds, ...prev]);
	}

	function formatMilliseconds(ms: number): string {
		const date = new Date(ms);
		const minutes = date.getUTCMinutes().toString().padStart(2, "0");
		const seconds = date.getUTCSeconds().toString().padStart(2, "0");
		const milliseconds = (date.getUTCMilliseconds() / 10)
			.toString()
			.padStart(2, "0");

		return `${minutes}:${seconds}:${milliseconds}`;
	}

	return (
		<div>
			<p>{formatMilliseconds(elapsedMilliseconds)}</p>
			<StopWatchButton onClick={startStopwatch}>Start</StopWatchButton>
			<StopWatchButton onClick={stopStopwatch}>Stop</StopWatchButton>
			<StopWatchButton onClick={resetStopwatch}>Reset</StopWatchButton>
			<StopWatchButton onClick={addLap}>Lap</StopWatchButton>
			<ol data-testid="lap-list">
				{laps.map((lap) => (
					<li key={lap}>{formatMilliseconds(lap)}</li>
				))}
			</ol>
		</div>
	);
}
