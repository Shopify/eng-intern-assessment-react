import React from "react";
import {
	StopWatchWrap,
	TimerBlock,
	TimeTypeText,
	TimeText,
	ColonWrap,
	Dot,
	CentisecondsText,
} from "./styles/stopwatch.styles";

type StopWatchProps = {
	hours: string;
	minutes: string;
	seconds: string;
	centiseconds: string;
};

export default function StopWatch({
	hours,
	minutes,
	seconds,
	centiseconds,
}: StopWatchProps) {
	return (
		<StopWatchWrap>
			<TimerBlock>
				<TimeText>{hours}</TimeText>
				<TimeTypeText>HOURS</TimeTypeText>
			</TimerBlock>
			<ColonWrap>
				<Dot />
				<Dot />
			</ColonWrap>
			<TimerBlock>
				<TimeText>{minutes}</TimeText>
				<TimeTypeText>MINUTES</TimeTypeText>
			</TimerBlock>
			<ColonWrap>
				<Dot />
				<Dot />
			</ColonWrap>
			<TimerBlock>
				<TimeText>{seconds}</TimeText>
				<TimeTypeText>SECONDS</TimeTypeText>
				<CentisecondsText>{centiseconds}</CentisecondsText>
			</TimerBlock>
		</StopWatchWrap>
	);
}
