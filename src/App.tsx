import React, { useState, useEffect } from 'react';

import StopWatch from './StopWatch';

import './styles/index.css';

export default function App() {
    // State to store the current time elapsed on the stopwatch in miliseconds
	const [timeElapsed, setTimeElapsed] = useState(0);

    // State to store whether the stopwatch is running or not
	const [isActive, setIsActive] = useState(false);

    // State to store the time elapsed for each lap in an array
	const [laps, setLaps] = useState<number[]>([]);

	useEffect(() => {
		let interval: NodeJS.Timer;
        
        // We use an interval to increment the elapsed time by 1 ms every 10 miliseconds
		if (isActive) {
			interval = setInterval(() => setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1), 10);
		} else {
            // If the stopwatch is inactive, clear the interval
            clearInterval(interval);
        }

        // We make sure that the interval clears after the component is unmounted
		return () => clearInterval(interval);
	}, [isActive, timeElapsed]);

	return (
		<div className="container">
			<StopWatch
				timeElapsed={timeElapsed}
                isActive={isActive}
                laps={laps}
				setTimeElapsed={setTimeElapsed}
				setIsActive={setIsActive}
				setLaps={setLaps}
			/>
		</div>
	);
}
