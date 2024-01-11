// src/StopwatchButton.tsx
import React from "react";

/**
 * Props for stopwatch button component
 */
interface StopwatchButtonProps {
	onStart: () => void;

	onStop: () => void;

	onReset: () => void;
}

/**
 * A component that renders buttons for controlling a stopwatch.
 *
 * @param {StopwatchButtonProps} props - The props for the StopwatchButton component.
 * @returns {JSX.Element} The rendered StopwatchButton component.
 */
const StopwatchButton: React.FC<StopwatchButtonProps> = ({
	onStart,
	onStop,
	onReset,
}) => {
	return (
		<div>
			<button onClick={onStart}>Start</button>
			<button onClick={onStop}>Stop</button>
			<button onClick={onReset}>Reset</button>
		</div>
	);
};

export default StopwatchButton;
