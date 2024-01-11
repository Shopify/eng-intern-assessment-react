// src/Stopwatch.tsx
import React from "react";

interface StopwatchProps {
	time: number; // time in milliseconds
}

const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
	const formatTime = (time: number) => {
		const getMilliseconds = `0${time % 1000}`.slice(-3);
		const seconds = Math.floor(time / 1000);
		const getSeconds = `0${seconds % 60}`.slice(-2);
		const minutes = Math.floor(seconds / 60);
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);

		return `${getHours}:${getMinutes}:${getSeconds}.${getMilliseconds}`;
	};

	return <div>{formatTime(time)}</div>;
};

export default Stopwatch;
