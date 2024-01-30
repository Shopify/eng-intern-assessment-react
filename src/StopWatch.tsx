import React from 'react';
import StopWatchButton from './StopWatchButton';

export default function StopWatch({
	timeElapsed,
	isActive,
	laps,
	setTimeElapsed,
	setIsActive,
	setLaps,
}: {
	timeElapsed: number;
	laps: number[];
	isActive: boolean;
	setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	setLaps: React.Dispatch<React.SetStateAction<number[]>>;
}) {

    // Helper function to pad time units with 0s so that they are always at least 2 digits.
	const formatTimeUnit = (timeUnit: number) => {
		return timeUnit.toString().padStart(2, "0");
	};

	const formatTimeElapsed = (timeElapsed: number) => {
		const MS_SECOND = 100;
		const MS_MINUTE = MS_SECOND * 60;
		const MS_HOUR = MS_MINUTE * 60;

        // Convert the time to hours
		const hours = Math.floor(timeElapsed / MS_HOUR);

        // Convert the remainder of the time to minutes
		const minutes = Math.floor((timeElapsed % MS_HOUR) / MS_MINUTE);

        // Convert the remainder of the time to seconds
		const seconds = Math.floor((timeElapsed % MS_MINUTE) / MS_SECOND);

        // Store the remainder of the time in miiseconds
		const miliseconds = timeElapsed % MS_SECOND;

        // Use a template literal to format the time in hh:mm:ss.ms format
		return `${formatTimeUnit(hours)}:${formatTimeUnit(
			minutes
		)}:${formatTimeUnit(seconds)}.${formatTimeUnit(miliseconds)}`;
	};

    // Start/stop the stopwatch when the Start/Stop button is pressed.
	const handleStartAndStop = () => {
		setIsActive((isActive) => !isActive);
	};

    // Append the new lap to the array of laps when the lap button is pressed.
	const handleLap = () => {
		setLaps((prevLaps) => [...prevLaps, timeElapsed]);
	};

    // Reset the time and amount of laps when the reset button is pressed.
	const handleReset = () => {
		setTimeElapsed(0);
		setLaps([]);
	};

    // The event handlers for the buttons are passed to the StopWatchButton component,
    // which contains the button attributes themselves.
	return (
		<div className="stopwatch-container">
			<div className="stopwatch-display">
				<p className="stopwatch-time" data-testid="stopwatch-time">
					{formatTimeElapsed(timeElapsed)}
				</p>
			</div>
			<StopWatchButton
				isActive={isActive}
				handleStartAndStop={handleStartAndStop}
				handleLap={handleLap}
				handleReset={handleReset}
			/>
			<div className="stopwatch-laps" data-testid="stopwatch-laps">
				<ul>
					{laps
						.map((lapTime, index) => {
                            // We calculate the time for each lap by finding the difference between
                            // the previous button press and the most recent button press.
							const lapTimeDifference =
								index === 0
									? lapTime
									: lapTime - laps[index - 1];

							return (
								<li key={index} className="lap-entry">
									<span>{`Lap ${index + 1} `}</span>
									<span>
										{formatTimeElapsed(lapTimeDifference)}
									</span>
								</li>
							);
						})
						.reverse()}
				</ul>
			</div>
		</div>
	);
}
