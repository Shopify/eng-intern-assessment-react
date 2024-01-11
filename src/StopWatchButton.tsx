import React from "react";

/**
 * Props for stopwatch button component
 */
interface StopwatchButtonProps {
	onStart: () => void;

	onStop: () => void;

	onReset: () => void;

	onLap: () => void;

	onPause: () => void;

	onResume: () => void;
}

/**
 * A component that renders buttons for controlling a stopwatch.
 * @param {StopwatchButtonProps} props - The props for the StopwatchButton component.
 * @returns The rendered StopwatchButton component.
 */
const StopwatchButton: React.FC<StopwatchButtonProps> = ({
	onStart,
	onStop,
	onReset,
	onLap,
	onPause,
	onResume,
}) => {
	return (
		<div>
			<button onClick={onStart}>Start</button>
			<button onClick={onStop}>Stop</button>
			<button onClick={onReset}>Reset</button>
			<button onClick={onLap}>Lap</button>
			<button onClick={onResume}>Resume</button>
			<button onClick={onPause}>Pause</button>
		</div>
	);
};

export default StopwatchButton;
