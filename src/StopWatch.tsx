import React, { useRef, useState } from "react";
import StopWatchButton from "./StopWatchButton";

export default function StopWatch() {
	const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
	const [currentLapMilliseconds, setCurrentLapMilliseconds] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [laps, setLaps] = useState<number[]>([]);
	const intervalRef = useRef<NodeJS.Timer>(null);

	function startStopwatch() {
		intervalRef.current = setInterval(() => {
			setElapsedMilliseconds((prev) => prev + 10);
			setCurrentLapMilliseconds((prev) => prev + 10);
		}, 10);

		setIsRunning(true);
	}

	function stopStopwatch() {
		clearInterval(intervalRef.current);
		intervalRef.current = null;
		setIsRunning(false);
	}

	function resetStopwatch() {
		if (intervalRef.current !== null) {
			stopStopwatch();
		}

		setElapsedMilliseconds(0);
		setCurrentLapMilliseconds(0);
		setLaps([]);
	}

	function addLap() {
		setLaps((prev) => [currentLapMilliseconds, ...prev]);
		setCurrentLapMilliseconds(0);
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
		<div className="w-full max-w-xs">
			<p className="text-7xl font-bold tabular-nums">
				{formatMilliseconds(elapsedMilliseconds)}
			</p>
			<div className="flex justify-between my-10">
				<StopWatchButton
					onClick={isRunning ? stopStopwatch : startStopwatch}
					className={
						isRunning
							? "text-red-500 bg-red-950"
							: "text-green-500 bg-green-950"
					}
				>
					{isRunning ? "Stop" : "Start"}
				</StopWatchButton>
				<StopWatchButton onClick={addLap} disabled={elapsedMilliseconds === 0}>
					Lap
				</StopWatchButton>
				<StopWatchButton onClick={resetStopwatch}>Reset</StopWatchButton>
			</div>

			<ol
				data-testid="lap-list"
				className="px-2 text-lg w-full flex flex-col gap-1"
			>
				{laps.map((lap, i) => (
					<li key={lap} className="flex justify-between">
						<span>Lap {laps.length - i}</span>
						<span className="tabular-nums">{formatMilliseconds(lap)}</span>
					</li>
				))}
			</ol>
		</div>
	);
}
