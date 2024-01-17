import React from "react";

interface TimerState {
	exists: boolean;
	time: number;
	isPaused: boolean;
}

// accepts timerstate in order to control rendering of buttons based on timer info
interface StopWatchButtonProps {
	timerState: TimerState;
	onStartClicked: () => void;
	onStopClicked: () => void;
	onLapClicked: () => void;
	onPauseClicked: () => void;
}

export default function StopWatchButton({
	timerState,
	onStartClicked,
	onStopClicked,
	onLapClicked,
	onPauseClicked,
}: StopWatchButtonProps) {
	return (
		<div>
			{!timerState.exists && (
				<button onClick={onStartClicked}>Start</button>
			)}
			{timerState.exists && (
				<button onClick={onPauseClicked}>
					{timerState.isPaused ? "Unpause" : "Stop"}
				</button>
			)}
			{timerState.exists && <button onClick={onLapClicked}>Lap</button>}
			{timerState.exists && (
				<button onClick={onStopClicked}>Reset</button>
			)}
		</div>
	);
}
