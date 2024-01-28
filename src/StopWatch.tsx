import React, { useEffect, useState } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';
import { Timer } from './types/timer';

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
				() => setTimer({ ...timer, time: time + 1 }),
				10
			);
		}
		return () => clearInterval(interval);
	}, [time, isRunning]);

	const toggleTimer = () => {
		setTimer({ ...timer, isRunning: !isRunning });
	};

	const resetTimer = () => {
		setTimer({
			time: 0,
			isRunning: false,
			laps: [],
		});
	};

	const lapTimer = () => {
		setTimer({
			...timer,
			laps: [...laps, { number: laps.length, totalTime: 0 }],
		});
	};

	return (
		<main>
			<h1 className='title'>Stopwatch</h1>
			<h2 className='time'>{time}</h2>
			<StopWatchButton onClick={toggleTimer}>
				{!isRunning ? 'Start' : 'Stop'}
			</StopWatchButton>
			<StopWatchButton onClick={lapTimer} disabled={!!time}>
				Lap
			</StopWatchButton>
			<StopWatchButton onClick={resetTimer} disabled={!!time}>
				Reset
			</StopWatchButton>
		</main>
	);
}

