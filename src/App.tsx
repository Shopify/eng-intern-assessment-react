import React, { useEffect, useMemo, useState } from "react";
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
	ShortcutIcon,
} from "./styles/app.styles";
import StopWatchButton from "./StopWatchButton";
import { TimeFormat } from "./types";
import { useHotkeys } from "react-hotkeys-hook";
import ShortcutsDialog from "./ShortcutsDialog";

/**
 * Format the time unit to show double digits '00'
 * @param unit time unit value to format
 * @returns time unit formatted into double digits
 */
const formatTimeUnit = (unit: number) => String(unit).padStart(2, "0");

/**
 * Calculates each time unit and formats it
 * @param centisecondsTime number that holds our base time unit value
 * @returns object containing our formatted time units
 */
const getFormattedTime = (centisecondsTime: number) => {
	const hours = Math.floor(centisecondsTime / 360000);
	const minutes = Math.floor((centisecondsTime % 360000) / 6000);
	const seconds = Math.floor((centisecondsTime % 6000) / 100);
	const centiseconds = centisecondsTime % 100;

	return {
		hours: formatTimeUnit(hours),
		minutes: formatTimeUnit(minutes),
		seconds: formatTimeUnit(seconds),
		centiseconds: formatTimeUnit(centiseconds),
	};
};

export default function App() {
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [lapTimes, setLapTimes] = useState<TimeFormat[]>([]);
	const [open, setOpen] = useState<boolean>(false);

	const formattedTime = useMemo(
		() => getFormattedTime(timeElapsed),
		[timeElapsed]
	);

	const resetTimer = () => {
		setTimeElapsed(0);
		setIsRunning(false);
		setLapTimes([]);
	};
	const toggleTimer = () => setIsRunning((prevIsRunning) => !prevIsRunning);
	const lapTimer = () => {
		if (isRunning)
			setLapTimes((prevLapTimes) => [...prevLapTimes, formattedTime]);
	};

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

		return () => clearInterval(interval);
	}, [isRunning]);

	// Shortcut to start/stop timer
	useHotkeys("ctrl+s", () => {
		toggleTimer();
	});

	// Shortcut to reset timer
	useHotkeys("ctrl+r", () => {
		resetTimer();
	});

	// Shortcut to lap timer
	useHotkeys("ctrl+l", () => {
		lapTimer();
	});

	const { hours, minutes, seconds, centiseconds } = formattedTime;

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
				<LapContainer data-testid="lap-list">
					{lapTimes.map(
						({ hours, minutes, seconds, centiseconds }, i) => {
							return (
								<LapTime key={`${centiseconds}${i}`}>
									<LapNumText>
										{`Lap ${(i + 1)
											.toString()
											.padStart(2, "0")}`}
									</LapNumText>
									<LapTimeText>
										{`${hours}:${minutes}:${seconds}:${centiseconds}`}
									</LapTimeText>
								</LapTime>
							);
						}
					)}
				</LapContainer>
				<ShortcutIcon onClick={() => setOpen(true)} />
				<ShortcutsDialog open={open} onClose={() => setOpen(false)} />
			</PageContainer>
		</BackgroundContainer>
	);
}
