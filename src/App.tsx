import React, { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import {
	PageContainer,
	BackgroundContainer,
	TitleText,
	TitleWrap,
	LapContainer,
	LapTime,
	LapNumText,
	LapTimeText,
} from "./styles/app.styles";
import StopWatchButton from "./StopWatchButton";

interface TimeFormat {
	hours: string;
	minutes: string;
	seconds: string;
	centiseconds: string;
}

export default function App() {
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [lapTimes, setLapTimes] = useState<TimeFormat[]>([]);

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

	const resetTimer = () => {
		setTimeElapsed(0);
		setIsRunning(false);
		setLapTimes([]);
	};
	const toggleTimer = () => setIsRunning((prevIsRunning) => !prevIsRunning);
	const lapTimer = () =>
		setLapTimes((prevLapTimes) => [
			...prevLapTimes,
			getFormattedTime(timeElapsed),
		]);

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

				<LapContainer>
					{lapTimes.map(
						({ hours, minutes, seconds, centiseconds }, i) => {
							return (
								<LapTime>
									<LapNumText>{`Lap ${(i + 1)
										.toString()
										.padStart(2, "0")}`}</LapNumText>

									<LapTimeText>
										{`${hours}:${minutes}:${seconds}:${centiseconds}`}
									</LapTimeText>
								</LapTime>
							);
						}
					)}
				</LapContainer>
			</PageContainer>
		</BackgroundContainer>
	);
}
