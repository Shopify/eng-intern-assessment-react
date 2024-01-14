import React from "react";

interface StopwatchProps {
	time: number; // time in milliseconds
}

/**
 * Stopwatch component that displays the formatted time
 *
 * @param time - The time in milliseconds
 * @returns The formatted time in the format "H:M:S.M"
 */
const Stopwatch: React.FC<StopwatchProps> = ({ time }) => {
	{
		//Format the date and return it after passing in the time
	}
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

	return <div className="stopwatch-display">{formatTime(time)}</div>;
};

export default Stopwatch;
