import React, { useEffect, useState } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';
import { Timer } from './types/Timer';

const formatTime = (time: number): string => {
	if (time === 0) {
		return '--:--:--';
	}
	const ms = (time % 100).toString().padStart(2, '0');
	const s = Math.floor((time % 6000) / 100)
		.toString()
		.padStart(2, '0');
	const mins = Math.floor((time % 360000) / 6000)
		.toString()
		.padStart(2, '0');

	return `${mins}:${s}:${ms}`;
};

export default function StopWatch() {
	const [timer, setTimer] = useState<Timer>({
		time: 0,
		isRunning: false,
		laps: [],
	});

	const { time, isRunning, laps } = timer;

	useEffect(() => {
		let interval: NodeJS.Timer;
		if (isRunning) {
			interval = setInterval(
				() => setTimer((timer) => ({ ...timer, time: time + 1 })),
				10
			);
		}
		return () => clearInterval(interval);
	}, [time, isRunning]);

	const toggleTimer = () => {
		setTimer((timer) => ({ ...timer, isRunning: !isRunning }));
	};

	const resetTimer = () => {
		setTimer({
			time: 0,
			isRunning: false,
			laps: [],
		});
	};

	const lapTimer = () => {
		setTimer((timer) => ({
			...timer,
			laps: [...laps, formatTime(time)],
		}));
	};

	return (
		<main>
			<h1 className='title'>Stopwatch</h1>
			<h2 className='time'>{formatTime(time)}</h2>
			<StopWatchButton onClick={toggleTimer}>
				{!isRunning ? 'Start' : 'Stop'}
			</StopWatchButton>
			<StopWatchButton onClick={lapTimer} disabled={!time}>
				Lap
			</StopWatchButton>
			<StopWatchButton onClick={resetTimer} disabled={!time}>
				Reset
			</StopWatchButton>
			<h3 className='lap-title'>Lap List</h3>
			<ol className='lap-list'>
				{laps ? (
					laps.map((lap, i) => (
						<li>
							<p>{i}</p>
							<p>{lap}</p>
						</li>
					))
				) : (
					<li></li>
				)}
			</ol>
		</main>
	);
}

