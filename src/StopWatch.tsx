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
import { TimeFormat } from "./types";

export default function StopWatch({
	hours = "00",
	minutes = "00",
	seconds = "00",
	centiseconds = "00",
}: TimeFormat) {
	return (
		<StopWatchWrap>
			<TimerBlock>
				<TimeText data-testid="hours">{hours}</TimeText>
				<TimeTypeText>HOURS</TimeTypeText>
			</TimerBlock>
			<ColonWrap>
				<Dot />
				<Dot />
			</ColonWrap>
			<TimerBlock>
				<TimeText data-testid="minutes">{minutes}</TimeText>
				<TimeTypeText>MINUTES</TimeTypeText>
			</TimerBlock>
			<ColonWrap>
				<Dot />
				<Dot />
			</ColonWrap>
			<TimerBlock>
				<TimeText data-testid="seconds">{seconds}</TimeText>
				<TimeTypeText>SECONDS</TimeTypeText>
				<CentisecondsText data-testid="centiseconds">
					{centiseconds}
				</CentisecondsText>
			</TimerBlock>
		</StopWatchWrap>
	);
}
