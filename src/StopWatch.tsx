import React, { useEffect, useState } from 'react';
import StopWatchButton from './StopWatchButton';
import './styles/StopWatch.css';
import { Timer } from './types/Timer';

export default function StopWatch() {
	const [timer, setTimer] = useState<Timer>({
		time: null,
		isRunning: false,
		laps: [],
	});

	useEffect(() => {
		let interval: NodeJS.Timer;
		if (timer.isRunning || true) {
			interval = setInterval(
				() => setTimer({ ...timer, time: timer.time + 1 }),
				10
			);
		}
		return () => clearInterval(interval);
	}, []);

	const startTimer = () => {};

	const stopTimer = () => {};

	const resetTimer = () => {};

	const lapTimer = () => {};

	return (
		<main>
			<h1 className='title'>Stopwatch</h1>
			<h2 className='time'>{timer.time}</h2>
			{/* <StopWatchButton onClick={startTimer}>Start</StopWatchButton>
			<StopWatchButton>Stop</StopWatchButton>
			<StopWatchButton>Lap</StopWatchButton>
			<StopWatchButton>Reset</StopWatchButton> */}
		</main>
	);
}

