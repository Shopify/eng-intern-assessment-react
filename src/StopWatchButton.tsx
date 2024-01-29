import React from 'react';

export default function StopWatchButton({
	isActive,
	handleStartAndStop,
	handleLap,
	handleReset,
}: {
	isActive: boolean;
	handleStartAndStop: React.MouseEventHandler<HTMLButtonElement>;
	handleLap: React.MouseEventHandler<HTMLButtonElement>;
	handleReset: React.MouseEventHandler<HTMLButtonElement>;
}) {
    
    // The Stop and Lap buttons are only visible while the stopwatch is active.
    // Similarly, the Start and Reset buttons are only visible while the stopwatch is inactive.
	return (
		<div className="stopwatch-buttons">
			<button
				className="stopwatch-button"
				id="startButton"
				onClick={handleStartAndStop}
			>
				{isActive ? 'Stop' : 'Start'}
			</button>
			<button
				className="stopwatch-button"
				id={isActive ? "lapButton" : "resetButton"}
				onClick={isActive ? handleLap : handleReset}
			>
				{isActive ? "Lap" : "Reset"}
			</button>
		</div>
	);
}
