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
		<div className="stopwatch-container">
			<div className="stopwatch-button">
				<button className="start" onClick={onStart}>
					Start
				</button>
				<button className="stop" onClick={onStop}>
					Stop
				</button>
				<button className="reset" onClick={onReset}>
					Reset
				</button>
				<button className="lap" onClick={onLap}>
					Lap
				</button>
				<button className="resume" onClick={onResume}>
					Resume
				</button>
				<button className="pause" onClick={onPause}>
					Pause
				</button>
			</div>
		</div>
	);
};

export default StopwatchButton;
