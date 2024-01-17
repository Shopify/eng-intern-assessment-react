import React from "react";

interface TimerState {
	exists: boolean;
	time: number;
	isPaused: boolean;
}

// accepts timerstate in order to control rendering of buttons based on timer info
interface StopWatchButtonProps {
	timerState: TimerState;
	onStartClicked?: () => void;
	onStopClicked?: () => void;
	onLapClicked?: () => void;
	onPauseClicked?: () => void;
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
				<button data-testid="start" onClick={onStartClicked}>
					Start
				</button>
			)}
			{timerState.exists && (
				<button data-testid="pause" onClick={onPauseClicked}>
					{timerState.isPaused ? "Unpause" : "Stop"}
				</button>
			)}
			{timerState.exists && (
				<button data-testid="lap" onClick={onLapClicked}>
					Lap
				</button>
			)}
			{timerState.exists && (
				<button data-testid="reset" onClick={onStopClicked}>
					Reset
				</button>
			)}
		</div>
	);
}
