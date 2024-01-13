import React from "react";
import {
	ButtonWrap,
	StartIcon,
	ResetLapButton,
	StartStopButton,
} from "./styles/stopwatchbutton.styles";

type StopWatchButtonProps = {
	isRunning: boolean;
	toggleTimer: Function;
	lapTimer: Function;
	resetTimer: Function;
};

export default function StopWatchButton({
	isRunning,
	toggleTimer,
	lapTimer,
	resetTimer,
}: StopWatchButtonProps) {
	return (
		<ButtonWrap>
			<StartStopButton onClick={() => toggleTimer()}>
				{isRunning ? "STOP" : "START"}
			</StartStopButton>
			<ResetLapButton
				onClick={() => {
					isRunning ? lapTimer() : resetTimer();
				}}
			>
				{isRunning ? "LAP" : "RESET"}
			</ResetLapButton>
		</ButtonWrap>
	);
}
