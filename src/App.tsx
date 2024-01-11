import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import {
	PageContainer,
	BackgroundContainer,
	TitleText,
	TitleWrap,
} from "./styles/app.styles";
import StopWatchButton from "./StopWatchButton";

export default function App() {
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [lapTimes, setLapTimes] = useState<number[]>([]);

	const resetTimer = () => {
		setTimeElapsed(0);
		setIsRunning(false);
	};
	const toggleTimer = () => setIsRunning((prevIsRunning) => !prevIsRunning);
	const lapTimer = () =>
		setLapTimes((prevLapTimes) => [...prevLapTimes, timeElapsed]);

	const getFormattedTime = (centisecondsTime: number) => {
		const hours = Math.floor(centisecondsTime / 360000);
		const minutes = Math.floor((centisecondsTime % 360000) / 6000);
		const seconds = Math.floor((centisecondsTime % 6000) / 100);
		const centiseconds = centisecondsTime % 100;

		// Format the times to show double digits '00'
		const formattedHours = String(hours).padStart(2, "0");
		const formattedMinutes = String(minutes).padStart(2, "0");
		const formattedSeconds = String(seconds).padStart(2, "0");
		const formattedCentiseconds = String(centiseconds).padStart(2, "0");

		return {
			hours: formattedHours,
			minutes: formattedMinutes,
			seconds: formattedSeconds,
			centiseconds: formattedCentiseconds,
		};
	};

	const { hours, minutes, seconds, centiseconds } =
		getFormattedTime(timeElapsed);

	/**
	 * If our stopwatch is running we will set an interval
	 * to update the timeElapsed every second, runs on every mount
	 * or when isRunning changes.
	 */
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isRunning) {
			interval = setInterval(() => {
				setTimeElapsed((prevElapsedTime) => prevElapsedTime + 1);
			}, 10); // 10 here for centiseconds
		}

		return () => {
			clearInterval(interval);
		};
	}, [isRunning]);

	return (
		<BackgroundContainer>
			<PageContainer>
				<TitleWrap>
					<TitleText>Every</TitleText>
					<TitleText>Second</TitleText>
					<TitleText>Counts</TitleText>
				</TitleWrap>
				<StopWatch
					hours={hours}
					minutes={minutes}
					seconds={seconds}
					centiseconds={centiseconds}
				/>
				<StopWatchButton
					isRunning={isRunning}
					toggleTimer={toggleTimer}
					lapTimer={lapTimer}
					resetTimer={resetTimer}
				/>
			</PageContainer>
		</BackgroundContainer>
	);
}
