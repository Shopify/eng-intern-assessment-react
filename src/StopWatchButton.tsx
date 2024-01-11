// src/StopwatchButton.tsx
import React from "react";

interface StopwatchButtonProps {
	onStart: () => void;
	onStop: () => void;
	onReset: () => void;
}

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
